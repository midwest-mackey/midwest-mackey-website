FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN apk add --no-cache curl

COPY src ./src
COPY public /app/public

COPY docker-entrypoint.sh /app/docker-entrypoint.sh

RUN chmod +x /app/docker-entrypoint.sh

RUN mkdir -p /app/public/images
RUN mkdir -p /app/db

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["/bin/sh", "/app/docker-entrypoint.sh"]