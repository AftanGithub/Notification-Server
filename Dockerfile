FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of application code
COPY . .

# Expose the port app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]  
