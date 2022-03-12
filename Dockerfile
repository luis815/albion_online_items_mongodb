FROM node:lts-alpine
WORKDIR /home/node/
USER node
COPY ./package.json ./
RUN npm install
CMD [ "node", "main.js" ]
