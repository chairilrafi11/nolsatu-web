FROM oven/bun:1-alpine AS build
WORKDIR /src
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ARG VITE_DATA_SOURCE=mock
ARG VITE_API_URL=http://localhost:3170
ENV VITE_DATA_SOURCE=$VITE_DATA_SOURCE
ENV VITE_API_URL=$VITE_API_URL
RUN bun run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist /usr/share/nginx/html
EXPOSE 80
