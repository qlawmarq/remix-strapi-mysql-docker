FROM node:18 AS deps
RUN apt-get update && apt-get install libvips-dev -y
WORKDIR /opt/
COPY ./package*.json .
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install

FROM node:18 AS builder
WORKDIR /opt/app
COPY --from=deps /opt/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "dev"]
