# Build BASE
FROM node:18-alpine as base

WORKDIR /app

COPY package.json package-lock.json ./

RUN apk add --no-cache git \
    && npm ci \
    && npm cache clean --force

# Build DEV
FROM node:18-alpine as build

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules

COPY . .

RUN apk add --no-cache git curl \
    && npm run build \
    && cd .next/standalone \
    && curl -sf https://gobinaries.com/tj/node-prune | sh \
    && node-prune node_modules

# Build PROD
FROM node:18-alpine as production

RUN apk add --no-cache curl \
    && apk update \
    && apk add bash

ENV NODE_ENV "production"

WORKDIR /app

COPY docker/start.sh ./
RUN chmod +x ./start.sh

COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/next.config.mjs ./
COPY --from=build /app/.next/standalone ./

EXPOSE 3000

CMD ["/bin/bash", "-c", "./start.sh"]
