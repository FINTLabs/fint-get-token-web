FROM node:9
COPY . /src
WORKDIR /src
RUN yarn && yarn build

FROM nginx
COPY --from=0 /src/build/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf