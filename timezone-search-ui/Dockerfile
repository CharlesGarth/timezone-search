FROM node:12.16.1
RUN mkdir -p /timezonesearch/ui/
WORKDIR /timezonesearch/ui/
COPY package.json /timezonesearch/ui/
RUN npm install
COPY . ./timezonesearch/ui/