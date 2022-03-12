FROM node:lts-alpine
WORKDIR /home/node/
USER node
COPY --chown=node:node ./package.json ./
RUN npm install
COPY --chown=node:node ./ ./
CMD [ "node", "main.js" ]
