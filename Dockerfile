FROM node:16-alpine
USER root
WORKDIR /data

# add chromium for testing
RUN \
  rm /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/v3.16/community" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/v3.16/main" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  && apk update && apk add --no-cache chromium ttf-freefont font-noto-emoji

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV CHROME_BIN /usr/bin/chromium-browser
ENV LIGHTHOUSE_CHROMIUM_PATH /usr/bin/chromium-browser

# add bash
RUN apk update && apk add --no-cache bash

# copy npm files to workdir
COPY package.json package-lock.json .npmrc ./

# install dependencies
RUN npm ci

# copy source files to workdir
COPY . .

# cmd to build the main app
CMD npm run ci:build
