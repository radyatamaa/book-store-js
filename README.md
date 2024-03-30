# Book Store JS

## About

- Uncle Bob's clean architecture implementation in express/typescript/jest/sequelize

## Features

- get/post books
- basic data validation via `@hapi/Joi`
- sequelize fixtures enabled
- basic jest test cases for repositories/services
- typescript configuration

## Getting Started

1. Install `Postgres` and start `Postgres.server`.
2. Install Node v18.17.0
3. Create database `book_store` for development and \
  `book_store_test` for test
4. `npm install`
5. `npm run dev`
6. For test, run `npm test`

## How To Run This Project

```bash
# move to project
cd book-store-js

# make a config backend
cp .env.example .env

# install packages backend
npm install

# run npm
npm run dev

# open project front end in cmd
cd frontend

# install packages frontend
npm install

# make a config frontend
cp .env.example .env

# run npm
npm run dev

# Open at browser the backend swagger
http://localhost:8084/swagger/

# Open at browser the frondend
http://localhost:8085
```
## Notes
You don't need to create table or add the data cause the data and table has been automaticly sync each app backend start , you need only create a database 'book_store'

## The App
### 1 . Swagger
![Swagger](https://github.com/radyatamaa/book-store-js/blob/dev/swagger.png)
### 2 . Web
![Web](https://github.com/radyatamaa/book-store-js/blob/dev/web-screenshoot.png)

## Folder Structure

- Controllers:
  Unlike huge and mighty typical express.js controllers, controllers focus \
  on returning response object for given custom request object(`IHttpRequest`).

- Repositories:
  Instead of directly using `sequelize` model methods, `repositories` wraps those api thus \
  provides proper abstractions over the framework.

- Errors:
  Generally, typical web application needs to handle two kinds of errors, one is 5XX error and \
  the other is 4XX error. So for 5XX errors, use native js `Error` and for 4XX errors, use `ClientError`.

- Model-validations:
  It validates given data with `Joi` schema.\
  It throws `ClientError` when data is invalid and returns `getter` methods for each field instead of returning data object directly.\
  This makes `service` code more resilient to changes in entities structure.

- Entity:
  Place for `sequelize` model definition however you can use whatever `ORM` or database client you like.
  It should work regardless of your selection of framework/library.

- Routes:
  It contains definition for each routes. For each route handlers, it must be wrapped with `buildExpressCallback` helper.
  Thus making our controller simple, dumb and not knowing which routing framework you're using.

- Services:
  It handles validations via `models-validation` and use `repositories` to interact with database or business logic.
