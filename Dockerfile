FROM node:16.13-alpine3.14
WORKDIR /app
ADD package.json .
ADD yarn.lock .
RUN yarn install
ADD . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start:dev"]
