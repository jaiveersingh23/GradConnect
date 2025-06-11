# Use an official Node.js runtime
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
# Using a wildcard to copy both if they exist
COPY package*.json ./

# Install all dependencies, including devDependencies for 'npm run dev'
RUN npm install

# Copying the rest of the code is not strictly necessary when using volumes,
# but it's good practice in case you run the container without a volume.
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# The command to run the application will be provided by docker-compose
# but we can add a default one here for good measure.
CMD [ "npm", "run", "dev" ]