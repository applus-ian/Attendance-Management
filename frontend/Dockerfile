# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first to cache them
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Install nodemon globally (optional, if not installed locally)
RUN npm install -g nodemon

# Expose port
EXPOSE 3000

# Start Next.js
CMD npm run dev