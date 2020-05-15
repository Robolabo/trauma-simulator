FROM node:10.13-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
COPY wait-for-it.sh /usr/wait-for-it.sh

RUN apk add --no-cache bash
RUN chmod 755 /usr/wait-for-it.sh
RUN npm install

COPY . .
COPY docker-entrypoint.sh /opt/docker-entrypoint.sh

RUN chmod 755 /opt/docker-entrypoint.sh

ENTRYPOINT ["/opt/docker-entrypoint.sh"]

EXPOSE 8080
