# Usa una imagen oficial de PHP con Apache como imagen principal
FROM php:8.1

# Establece el directorio de trabajo en /var/www/html
WORKDIR /var/www/html

# Copia el contenido del directorio actual al contenedor en /var/www/html
COPY . /var/www/html

# Instala dependencias
RUN apt-get update && apt-get install -y \
    libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instala las dependencias de Laravel
RUN composer install --optimize-autoloader --no-dev

# Establece permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer el puerto 80 (puerto predeterminado de Apache)
# EXPOSE 80

# Inicia Apache con el comando personalizado
CMD ["php","artisan","serve","--host=0.0.0.0","--port=8000"]