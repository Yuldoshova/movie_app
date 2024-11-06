# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.15.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm","run", "start:dev"]
