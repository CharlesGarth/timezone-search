FROM node:12.16.1
WORKDIR /timezonesearch
COPY package.json .
RUN npm install
COPY ./src ./src
COPY ./bin ./bin