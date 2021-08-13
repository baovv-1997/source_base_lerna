FROM node:14.16.0-alpine3.10

WORKDIR /app

ADD . .

RUN yarn

RUN yarn run build:client
RUN yarn run build:server

CMD ["yarn", "start"]

EXPOSE 3001
