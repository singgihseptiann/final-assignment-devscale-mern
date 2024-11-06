FROM node:lts

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm@latest
RUN npm install -g typescript

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 4173

CMD ["pnpm", "preview"]
