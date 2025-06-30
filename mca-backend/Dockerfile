# Backend Dockerfile for AdonisJS
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Copy .env.example to .env if .env does not exist
RUN [ -f .env ] || cp .env.example .env

EXPOSE 53422

CMD ["npm", "run", "dev"]
