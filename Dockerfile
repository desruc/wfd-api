FROM node:lts-alpine AS dependencies
WORKDIR /app
COPY package.json .
RUN yarn install --silent
COPY . .
RUN yarn build

FROM node:lts-alpine
WORKDIR /app
COPY package.json .
RUN yarn install --production
COPY --from=dependencies /app/build ./build

CMD ["node", "./build/index.js"]
