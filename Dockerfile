# Stage 1: Build the Angular application
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the application with NGINX
FROM nginx:1.25-alpine
# Copy custom nginx.conf if needed for routing (see optional step below)
COPY nginx.conf /etc/nginx/nginx.conf 
COPY --from=build /app/dist/midwestmackey /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]