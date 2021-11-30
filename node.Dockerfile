FROM node:14 

WORKDIR /src 

COPY questions-API /src/ 

RUN npm install 

EXPOSE 3000 

CMD npm start 