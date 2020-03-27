FROM node:12.16.1
RUN mkdir -p /timezonesearch/api/
WORKDIR /timezonesearch/api/
COPY package.json /timezonesearch/api/
RUN npm install
COPY ./src ./timezonesearch/api/src
COPY ./bin ./timezonesearch/api/bin