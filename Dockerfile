FROM node:26.13.1

RUN npm install -g npm@latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "./bin/start.sh" ]
