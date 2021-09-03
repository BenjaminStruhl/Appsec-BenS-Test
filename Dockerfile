FROM node:14.17.6-alpine as builder

WORKDIR /code

COPY package.json .
COPY package-lock.json .

RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]