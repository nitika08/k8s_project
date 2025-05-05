FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
