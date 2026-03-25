FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src

EXPOSE 3000

# Fix: point to src/server.js
CMD ["node", "src/server.js"]