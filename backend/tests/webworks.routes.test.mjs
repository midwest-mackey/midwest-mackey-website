import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';

const source = await fs.readFile(new URL('../src/routes/webworks.routes.js', import.meta.url), 'utf8');
const valid = { name: 'Test Customer', email: 'test@example.com', phone: '(515) 555-1234', services: ['newWebsite', 'hosting'], message: 'A small business website.' };
async function request(body, options = {}) {
  let handler;
  const calls = [];
  const mail = [];
  const context = vm.createContext({ console: { error() {}, warn() {} }, process: { env: options.noCredentials ? {} : { EMAIL_USER: 'sender@example.com', EMAIL_PASS: 'test' } } });
  const modules = {
    express: { Router: () => ({ post(path, fn) { assert.equal(path, '/inquiries'); handler = fn; } }) },
    nodemailer: { default: { createTransport(config) { assert.equal(config.service, 'gmail'); return { async sendMail(message) { mail.push(message); if (options.failMail) throw Error('Unavailable'); } }; } } },
    '../db/database.js': { getDb() { return { async run(sql, ...params) { calls.push({ sql, params }); if (options.failSave) throw Error('Unavailable'); } }; } },
  };
  const module = new vm.SourceTextModule(source, { context });
  await module.link(async specifier => {
    const exports = modules[specifier];
    return new vm.SyntheticModule(Object.keys(exports), function () { for (const [name, value] of Object.entries(exports)) this.setExport(name, value); }, { context });
  });
  await module.evaluate();
  const response = { code: 200, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
  await handler({ body }, response);
  return { response, calls, mail };
}
for (const body of [null, {...valid, email:'invalid'}, {...valid, phone:'abc'}, {...valid, services:[]}, {...valid, services:['unknown']}, {...valid, services:['hosting','hosting']}, {...valid, message:'x'.repeat(5001)}]) {
  const result = await request(body);
  assert.equal(result.response.code, 400);
  assert.equal(result.calls.length, 0);
  assert.equal(result.mail.length, 0);
}
const success = await request(valid);
assert.equal(success.response.code, 201);
assert.equal(success.calls.length, 2);
assert.match(success.calls[0].sql, /CREATE TABLE IF NOT EXISTS webworks_inquiries/);
assert.match(success.calls[1].sql, /INSERT INTO webworks_inquiries/);
assert.equal(success.calls[1].params[0], valid.name);
assert.equal(success.calls[1].params[3], JSON.stringify(valid.services));
assert.equal(success.mail.length, 2);
assert.equal(success.mail[0].to, 'midwestmackey@gmail.com');
assert.equal(success.mail[0].replyTo, valid.email);
assert.match(success.mail[0].text, /A new website, Hosting/);
assert.equal(success.mail[1].to, '5152031974@vtext.com');
assert.equal((await request(valid, {failMail:true})).response.code, 201);
assert.equal((await request(valid, {noCredentials:true})).response.code, 201);
const failed = await request(valid, {failSave:true});
assert.equal(failed.response.code, 500);
assert.equal(failed.mail.length, 0);
const header = await request({...valid,name:'Test\r\nInjected'});
assert.doesNotMatch(header.mail[0].subject, /[\r\n]/);
console.log('12 route cases passed: validation, persistence, recipients, notification failures, and save failure.');
