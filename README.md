# Movie Star Project

## Description

This project allows a logged user to interact with a catalog of movies. The client and server components were made using vuejs@2 and NodeJS. 
  
### Table of Contents
- [Getting Started](#gettingstarted)
- [Run Locally](#runner)
- [Docker](#docker)
- [Running the Tests](#test)
- 
- [About this project](#usageserver)
- [Tools employed](#tools)

## Getting Started
  #### Clone repo Server

``` bash
# clone the repo
$ git clone https://github.com/joseceron/movie-star.git
# go into app's directory
$ cd movie-star
```
#### Variables and dependencies
1. Ensure you have Node.js installed.

2. Create a `server/.env` file with a `PORT, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY` properties.

3. In the terminal, run: 
``` bash
$ npm install
```
## Run Locally

#### Running the Project

1.  Run in terminal
``` bash
$ npm run deploy
```

 2. Browse to the movie star frontend at [localhost:8000](http://localhost:8000) and signup a new user

## Docker

1. Ensure you have the latest version of Docker installed

2. In the terminal, run:  
``` bash
$ docker build -t movie-star .
```

3. In the terminal, run: 
```bash
$ docker run -it -p 8000:8000 movie-star
 ```

## Running the Tests

 To run any automated tests, run `npm test`. This will:

* Run all the server-side tests: 
```bash
$ npm test --prefix server
```

## About this project

Hi! This **Movie-star** project is made in order to show my skills along the use of different technologies building a fullstack project.

## Tools employed

### Tools & extensions
- VS code, Postman, github.
- js Linter, nodemon, prettier, git-commit-msg-linter
### Languages
- Typescript
### Technologies and frameworks
- NodeJS, dotenv, Express,  middleware, jwt, bcrypt, uuid,  CI/CD, Dynamo db, dynamo document client, swagger, jest, supertest, Docker, graphql (building...), CI/CD
- Vuejs@2, Vuex, axios, bootstrap-vue
### Software design
- Clean architecture, SOLID, KISS, YAGNI
- Gitflow
- client hosted in server as static content
