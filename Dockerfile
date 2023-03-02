FROM node:lts-alpine
RUN apk add --no-cache docker-compose
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3333
CMD ["npm", "run", "dev"]