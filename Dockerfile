FROM node:20-alpine as builder

WORKDIR /usr/src/app
COPY . .
RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM nginx:stable-alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html