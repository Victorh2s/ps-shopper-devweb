FROM node:20 AS prod
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/. .
RUN npx prisma generate
RUN npx prisma migrate dev
EXPOSE 8080
CMD ["npm", "run", "start:prod"]


FROM node:20 AS frontend_builder
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/. .
RUN npm run build

FROM node:23-slim AS frontend
RUN npm install -g serve
COPY --from=frontend_builder /frontend/dist /app/dist
EXPOSE 80
CMD ["serve", "-s", "/app/dist", "-l", "80"]