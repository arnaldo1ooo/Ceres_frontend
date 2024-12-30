# Imagen base
FROM nginx:alpine

LABEL desc="imagen docker de ceres frontend"

#Copiamos el compilado al directorio de NGINX
COPY /dist/ceres-frontend/. /usr/share/nginx/html


#Copiamos temporalmente el assets
COPY /dist/ceres-frontend/. /temporal-assets
# Script para copiar archivos de dist a /html sin sobrescribir config.json
RUN mkdir -p /usr/share/nginx/html/assets && \
    cp -r /temporal-assets/. /usr/share/nginx/html/ && \
    [ -f /usr/share/nginx/html/assets/config.json ] || cp /temporal-assets/assets/config.json /usr/share/nginx/html/assets/config.json && \
    rm -rf /temporal-assets


# Copiamos y reemplazamos configuración de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf