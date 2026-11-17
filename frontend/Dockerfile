FROM nginx:1.27-alpine

COPY index.html styles.css app.js api.js config.js config.runtime.example.js /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
