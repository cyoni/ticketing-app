FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm i --verbose
COPY . .
CMD ["npm", "run", "dev"]