# Shopping Spree

A back end system design application (MongoDB, Amazon ec2, NginX, Docker)

Shopping Spree loads millions of records from a CSV into a created Mongo DataBase.
It is then organized, aggregated, and optimized for use by a front-end application.




## Features

- Structured data using subset patterning to prevent unbounded arrays and memory loss
- Organized data using aggregation pipeline and indexed database to increase throughput from 12s to over 1500ps locally
- Containerized the servers using Docker and load balanced them using NginX
- Load-tested with K6 and scaled backend microservice to achieve > 1000 rps on AWS EC2 t2.micro


## Installation

Install Shopping Spree with npm

```bash
  npm install shopping-spree
  cd shopping-spree

  Run schema.sh to ETL data into MongoDB and index the database
```
    
## Deployment

To deploy this project..

```bash
  Create AWS instances

  Modify db/index.js and connect.sh with your ec2 public ip address

  Run connect.sh to ssh into ec2 instance 

  Run init.sh after ssh into instance to install git and docker

  Run docker-compose up --build mongo to run the db

  Run docker-compose up --build node to run the server

  * Make sure to change your security groups on ec2 to handle traffic to the port you make the 
  request to i.e. 3000
```


## Screenshots

![App Screenshot](https://user-images.githubusercontent.com/55206187/146851578-02b968fc-2c86-4993-8107-28a4ea343738.png)
![App Screenshot](https://user-images.githubusercontent.com/55206187/146851659-5cc54969-f544-48d4-a4d4-a83c7be76a03.png)
