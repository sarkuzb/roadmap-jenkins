# Use Node.js to build the React application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Build the React app
RUN npm run build

# Use nginx to serve the build files
FROM nginx:alpine

# Copy the built React app to the nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the nginx port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
