## Installation

```bash
# You should run postgress and rabbitmq.
# Because of educational purpose there is single postgress instance and database being shared between microservices.

$ cd test_nestjs_application
$ docker-compose up

# Then you should visit main application and microservices to install dependencies.

$ cd ./application
$ npm install
$ cd ../user-service
$ npm install
$ cd ../document-service
$ npm install
```

## Running the app

```bash
# At first start microservices

$ cd ../user-service
$ npm run start
$ cd ../document-service
$ npm run start

# Then start main application

$ cd ../application
$ npm run start
```

The application should be accessible on http://localhost:3000

Api routes

get user documents
http://localhost:3000/documents/:userId - GET

create document
http://localhost:3000/documents - POST

deactivate user
http://localhost:3000/user/deactivate - PUT

create user
http://localhost:3000/auth/register - POST

log-in
http://localhost:3000/auth/log-in - POST

log-out
http://localhost:3000/auth/log-out - POST

get current user
http://localhost:3000/auth - GET
