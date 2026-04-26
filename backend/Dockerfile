FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# needed for healthcheck
RUN apk add --no-cache curl

COPY src ./src

RUN mkdir -p /app/public/images

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "src/server.js"]