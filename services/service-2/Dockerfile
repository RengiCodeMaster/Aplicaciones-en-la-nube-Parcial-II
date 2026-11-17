FROM node:22-alpine

WORKDIR /app
COPY package*.json tsconfig.json eslint.config.js ./
RUN npm ci
COPY src ./src
RUN npm run build

EXPOSE 8001
CMD ["node", "dist/src/server.js"]
