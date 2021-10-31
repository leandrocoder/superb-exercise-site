FROM nginx:alpine
COPY ./dist /usr/share/nginx/html

# docker build -t simple-nginx .
# docker run --rm -it -p 8090:80 simple-nginx