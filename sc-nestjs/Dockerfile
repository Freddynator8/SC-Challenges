FROM node:18-alpine AS build

WORKDIR /sc-nestjs

ADD . .

RUN npm install

RUN npm run build

WORKDIR /sc-nestjs/dist

EXPOSE 3000
CMD ["node", "main.js"]