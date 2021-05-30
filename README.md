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

```bash
# Get user documents
http://localhost:3000/user/:userId/documents/ - GET

# Create document
http://localhost:3000/documents - POST

# Deactivate user
http://localhost:3000/user/:userId/deactivate - PUT

# Create user
http://localhost:3000/auth/register - POST

# Log-in
http://localhost:3000/auth/log-in - POST

# Log-out
http://localhost:3000/auth/log-out - POST

# Get current user
http://localhost:3000/auth - GET
```
