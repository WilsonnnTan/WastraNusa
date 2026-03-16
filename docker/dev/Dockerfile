FROM node:24-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml .
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]