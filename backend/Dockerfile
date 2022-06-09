FROM node:lts-alpine
                 
WORKDIR /app

COPY package*.json .

RUN npm install --only=production

USER node

COPY . .

CMD ["npm", "start"]

EXPOSE 2000




# FROM node:lts-alpine

# WORKDIR /app

# COPY package*.json ./

# COPY client/package*.json client/
# RUN npm run install-client --only=production

# COPY server/package*.json server/
# RUN npm run install-server --only=production

# COPY client/ client/
# RUN npm run build --prefix client

# COPY server/ server/

# USER node

# CMD [ "npm", "start", "--prefix", "server" ]

# EXPOSE 8000