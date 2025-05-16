# Use official PHP image
FROM php:8.2-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    unzip curl libpq-dev libpng-dev libjpeg-dev libfreetype6-dev libonig-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring gd \
    && rm -rf /var/lib/apt/lists/*  # Clean up

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application files
COPY . .

# Install Laravel dependencies
RUN composer install --no-interaction --no-scripts --prefer-dist

# Set the default command
CMD php artisan serve --host=0.0.0.0 --port=8000
