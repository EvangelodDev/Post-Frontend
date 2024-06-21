FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY VERSION /usr/share/nginx/html/version/VERSION
RUN  echo "{\"version\":\"$(cat /usr/share/nginx/html/version/VERSION)\"}" > /usr/share/nginx/html/version/version.json

EXPOSE 80
