FROM node:18 AS runner
WORKDIR /app
COPY ./package*.json .
RUN npm install
COPY . .
EXPOSE 3000
EXPOSE 8002
CMD [ "npm", "run", "dev" ]
