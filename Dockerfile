# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application using the built files
CMD ["node", "dist/server.js"]
