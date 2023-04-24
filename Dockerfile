FROM node:16-alpine
WORKDIR /app
RUN corepack enable

COPY . .
RUN pnpm install --frozen-lockfile

ENV MONGO_HOST mongodb
ENV REDIS_HOST redisdb
ENV MONGO_DBNAME makentu-competition
ENV MONGO_USERNAME eeinfo
ENV MONGO_PASSWORD password
ENV MONGO_PORT 27017
ENV REDIS_PORT 6379

RUN pnpm build

CMD ["pnpm", "run", "deploy"]