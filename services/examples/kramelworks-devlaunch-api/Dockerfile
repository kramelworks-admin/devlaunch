FROM node:20-bookworm-slim AS builder

WORKDIR /src

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-bookworm-slim AS runner

WORKDIR /src

ENV NODE_ENV=production

COPY --from=builder /src/package*.json ./

COPY --from=builder /src/dist ./dist

RUN npm ci --omit=dev

USER node

EXPOSE 8001

CMD ["node", "dist/main.js"]
