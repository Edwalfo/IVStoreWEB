# Utiliza una imagen base con Node.js 18
FROM node:18-alpine as BUILD_IMAGE  

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de configuración
COPY package.json .
COPY package-lock.json .

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación React
RUN npm run build

# Expone el puerto 3000 (o el puerto que hayas configurado en Vite)
EXPOSE 3000

# Define el comando para iniciar la aplicación (puedes ajustarlo según tus necesidades)
CMD ["npm", "run" ,"preview"]