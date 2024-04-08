# Use the specific version of node based on Alpine Linux for a small footprint
FROM node:16.20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Angular CLI uses port 4200 by default but your project might be configured differently.
# Exposing both 3000 for your requirement and 4200 for Angular's default.


# Copy the package.json and package-lock.json (if available)
# COPY package*.json ./
COPY . .
# Install bash for running postinstall scripts that may require it
RUN apk add --no-cache bash

# Install Angular CLI globally in the container to use ng commands
RUN npm install -g @angular/cli@11.0.0
# RUN npm install -g yarn
# RUN yarn
# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
# COPY . .

# Run the Angular application on the specified port
# CMD ["npm", "start"]

EXPOSE 4100 
CMD ["ng", "serve", "admin","--port", "4100", "--host", "0.0.0.0"]
