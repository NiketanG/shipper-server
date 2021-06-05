FROM node:latest
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY .env.production .env
COPY . ./
RUN yarn build
EXPOSE 4000
CMD [ "yarn", "start" ]
