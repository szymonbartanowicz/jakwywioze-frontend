FROM node:14.17.0-alpine3.13
WORKDIR /app
COPY . /app
RUN npm install
ENV NODE_ENV=production
CMD ["npm", "run", "serve"]