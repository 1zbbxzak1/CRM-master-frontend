# Используем node для сборки фронтенда
FROM node:20.12.2 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
ADD . .
RUN npm run build

