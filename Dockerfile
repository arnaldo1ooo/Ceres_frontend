FROM nginx:alpine

LABEL desc="imagen docker de angular 16 app"

COPY /dist/ceres-frontend/. /usr/share/nginx/html
