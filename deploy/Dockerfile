FROM node:14.16.1 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

WORKDIR /app/deploy/server
COPY deploy/server/package*.json ./
RUN npm i

COPY deploy/server/. ./

WORKDIR /app

CMD node deploy/server/server.js
