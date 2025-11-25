FROM node:22 AS base

# Builder
FROM base AS builder
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx prisma generate

RUN ls /app/generated/prisma

RUN npm run build

# Install
FROM base AS install
WORKDIR /app

COPY package*.json ./

RUN npm i --omit=dev

# Release
FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/dist dist
COPY --from=install /app/node_modules node_modules
COPY --from=builder /app/prisma prisma
COPY --from=builder /app/prisma.config.ts ./

CMD [ "node", "dist/src/main" ]