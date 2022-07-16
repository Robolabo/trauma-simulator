FROM nikolaik/python-nodejs:latest

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
COPY wait-for-it.sh /usr/wait-for-it.sh

RUN apt-get update
RUN apt-get install python3

#RUN apk add --no-cache bash
RUN chmod 755 /usr/wait-for-it.sh
RUN npm install
RUN pip3 install numpy
COPY . .
COPY docker-entrypoint.sh /opt/docker-entrypoint.sh

RUN chmod 755 /opt/docker-entrypoint.sh

ENTRYPOINT ["/opt/docker-entrypoint.sh"]

EXPOSE 8080
