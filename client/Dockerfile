# Use an official Node.js runtime
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copying the rest of the code is not strictly necessary when using volumes,
# but it's good practice in case you run the container without a volume.
COPY . .

# Expose the Vite development server port
EXPOSE 5173

# The command to run the application will be provided by docker-compose
CMD [ "npm", "run", "dev" ]