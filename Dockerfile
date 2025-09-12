FROM node:18

RUN apt-get update && apt-get install -y python3 build-essential

WORKDIR /app

COPY package*.json ./

RUN npm ci --build-from-source

COPY . .

EXPOSE 8080

CMD ["npm", "start"]