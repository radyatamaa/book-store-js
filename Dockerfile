# Use the official Node.js 18 image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production && npm install -g nodemon && npm install -g ts-node && npm install -D tsconfig-paths 

# Copy the rest of the application code
COPY . .

# Copy .env file
COPY .env .

# Set the environment variable for the port
# APP_ENV PORT=8080

# Expose the port the app runs on
EXPOSE $PORT

# Run the app
CMD ["npm", "start"]
