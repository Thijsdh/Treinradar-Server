FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Build the app
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]