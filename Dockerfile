# Use an official Node.js runtime as a parent image
FROM node:lts-alpine3.17

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

CMD ["sh", "-c", "npm run db:deploy && npm run dev"]
