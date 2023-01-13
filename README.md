# Gooseboi Backend
The webapplication for the Gooseboi, the backend were develop on Nestjs and Prisma ORM. The frontend were develop using the Vue.js

## Setup Project
1. After clone the project, install all the dependencies for backend
```bash
$ cd backend
$ npm install
```

2. Then install all the dependencies for the frontend
```bash
$ cd frontend
$ yarn install
```

## Running the app
1. Start up the database
```bash
docker-compose up
```
2. Open up new tab in console and run the backend
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
3. Then, open another terminal and run the frontend
```bash
# Compiles and hot-reloads for development
$ yarn serve

# Compiles and minifies for production
$ yarn build

# # Lints and fixes files
$ yarn lint
```

## Web Application Local URL
1. localhost:3000/api (Nestjs/ Swagger)
2. localhost:8080 (Vue.js)

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

### folder structure reference
1. https://medium.com/the-crowdlinker-chronicle/best-way-to-structure-your-directory-code-nestjs-a06c7a641401 (Nestjs)
2. https://simeonnortey.medium.com/how-to-structure-folders-in-your-vue-application-ea3934d56380 (Vue.js)

