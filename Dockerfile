FROM node:16-alpine3.17

WORKDIR /server

COPY package.json /server
RUN yarn install

COPY . /server/
EXPOSE 3000
CMD ["npm","run","dev"]