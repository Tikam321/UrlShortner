# 1. Select base image
FROM node:19-alpine

# 2. Set working directory inside container
WORKDIR /url-shortner

# 3. Copy package.json and lockfile first (to leverage caching on deps)
COPY package*.json ./

# 4. Copy the rest of your app's source code
COPY . .

# 5. Install dependencies
RUN npm install

# 6. Expose port (if your app listens on 8001)
EXPOSE 8001

# 7. Define default command
CMD ["node", "index.js"]