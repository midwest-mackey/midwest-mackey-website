FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# required for HEALTHCHECK
RUN apk add --no-cache curl

RUN mkdir -p /app/public/images

COPY src ./src

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "src/server.js"]