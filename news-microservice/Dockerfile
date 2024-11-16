# Use the official Node.js image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on (adjust the port if needed)
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
