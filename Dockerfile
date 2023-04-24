FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .
ENV MONGO_HOST mongodb
ENV REDIS_HOST redisdb
RUN yarn build

CMD ["yarn", "deploy"]
