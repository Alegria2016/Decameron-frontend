FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copia archivos de configuración primero
COPY package*.json .
COPY vite.config.js .

# 2. Instala dependencias
RUN npm install

# 3. Copia todo el proyecto
COPY . .

# 4. Verifica la estructura de archivos (debug)
RUN ls -la src/views/hotels/

# 5. Ejecuta el build
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 10000
CMD ["nginx", "-g", "daemon off;"]