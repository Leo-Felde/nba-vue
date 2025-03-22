FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN rm -rf node_modules package-lock.json && npm install

COPY . .

COPY .env .env

RUN npm run build

EXPOSE 3000

ENV VITE_PORT=3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost:3000 || exit 1

CMD ["npm", "run", "preview"]