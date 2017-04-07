FROM node:argon
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 7500
CMD ["npm", "start"]