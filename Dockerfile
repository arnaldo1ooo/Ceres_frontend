#Imagen Base
FROM nginx:alpine

LABEL desc="imagen docker de ceres frontend"

#Limpiamos archivos estaticos de NGINX
RUN rm -rf /usr/share/nginx/html/*

#Copiamos el compilado al directorio de NGINX
COPY /dist/ceres-frontend/. /usr/share/nginx/html