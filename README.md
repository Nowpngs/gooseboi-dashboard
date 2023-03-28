# Gooseboi Vinyl Shop Admin Dashboard

This is the admin dashboard for the Gooseboi Vinyl Shop, developed using Nest.js and Prisma for the backend and Vue.js with Tailwind CSS and Vuetify for the frontend.

The dashboard provides administrators with the ability to manage products, orders, and customers, as well as view analytics and reports.

## Table of Contents

- Installation
- Usage
- Contributing
- License

## Installation

To install and set up the project, clone the repository and install the dependencies for the backend and frontend:

```sh
make init-backend
make init-frontend
```

Next, start up the database and run the backend and frontend in separate terminal windows:

```sh
make run-db
make run-backend
make run-frontend
```

## Usage

Once the application is running, you can access the web application locally at:

* localhost:3000/api (Nest.js / Swagger)
* localhost:8080 (Vue.js)

To run tests for the application, you can use the following commands:

```sh
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Contributing
If you need to add a new schema to the application, you can follow these steps:

1. Add the new schema to the schema.prisma file
2. Migrate the schema by running: npx prisma migrate dev --name "anynameyouwant"
3. Create the controller and service using the following command in the gooseboi-backend/src/models directory: npx nest generate resource

If you need to reset the Docker database, you can run:
```sh
make reset-db
```
For more information about the folder structure of the application, please see the following references:
* https://medium.com/the-crowdlinker-chronicle/best-way-to-structure-your-directory-code-nestjs-a06c7a641401 (Nestjs)
* https://simeonnortey.medium.com/how-to-structure-folders-in-your-vue-application-ea3934d56380 (Vue.js)

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

