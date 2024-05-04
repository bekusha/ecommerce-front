# Use the official Node.js Docker image for ARM64 architecture
FROM node:21.6.2

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install 

# Copy the rest of your application's source code
COPY . .

# Expose the port that your Next.js application will run on
EXPOSE 3000

# Specify the command to run your Next.js server in development mode
CMD ["npm", "run", "dev"]
