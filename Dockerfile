FROM node:16.20-alpine

WORKDIR /usr/src/app



RUN apk add --no-cache bash


RUN npm install -g @angular/cli@11.0.0

COPY . .

RUN npm install



EXPOSE 4100 
CMD ["ng", "serve", "admin","--port", "4100", "--host", "0.0.0.0"]
