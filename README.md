# Gooseboi Backend
The backend application for the Gooseboi Admin Panel, develop by using Nestjs and Prisma ORM

## Setup Project
1. After clone the project, install all the dependencies 
```bash
$ cd gooseboi-backend
$ npm install
```

## Running the app
1. Start up the database
```bash
docker-compose up
```
2. Open up new tab in console and run the project
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Development Guide
### Setup new app in project
1. add the new schema to the `schema.prisma`
2. migrate the schema (don't forgot to commit the migration file)
```bash
npx prisma migrate dev --name "anyname u want"

```
3. create the controller and service
```bash 
$ cd gooseboi-backend/src/models
$ npx nest generate resource
```

