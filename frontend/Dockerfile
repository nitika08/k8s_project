FROM node:16-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
# Make sure public directory exists with index.html
RUN mkdir -p public
RUN echo '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Notes App</title></head><body><div id="root"></div></body></html>' > public/index.html
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
