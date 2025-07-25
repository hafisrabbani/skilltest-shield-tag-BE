FROM node:18-alpine
ARG APP_PORT
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --production && npm cache clean --force

COPY . .

EXPOSE $APP_PORT

CMD ["npm", "start"]
