# Swagger Pet Store

This backend application is a REST API that allows the retrieval and creation of pet data in a relational SQL database.

It was developed based on the Open API [specifications](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.yaml).

## Technology stack

### **Development**

- Node (JavaScript runtime environment)
- Express (Web server)
- Sequelize (ORM)

### **Testing**

- Mocha (Testing framework)
- Chai (Assertion library)
- Supertest (HTTP requests testing)
- nyc (Coverage tests)

### Other tools

- Postman (API endpoint testing)
- APIDOC (API Documentation)

## Install and run the project

### Install dependencies

In the root of the project execute:

```shell
npm install
```

### Set environment variables and configs for DB

1. Create a file named `.env` in the root of the project or rename the file `.env.example`.
2. Assign own values to the environment variables as in the example

```shell
DB_NAME=exampleDB
DB_USER=root
DB_PASSWORD=p4assw0rd
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DIALECT=mysql
```

*If you prefer, you can add another variable called* `PORT` *to configure the port on which the application runs.* `PORT=3000` ***by default.***

1. For the `DB_DIALECT` variable it is important to fill in with one of these values depending on the realtional database you use:

```jsx
'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'
```

1. You must have a database created with the name you assigned to `DB_NAME` to run the project.
2. Installs the drivers required to use the selected database. By default **mysql2** is already installed in the project.

```bash
# One of the following:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
$ npm install --save oracledb # Oracle Database
```

### Run the project in Development Mode

Use the next command to run the application in development mode.

```bash
npm run dev
```

*The command executes the project by assigning the value "development" to the environment variable* `NODE_ENV`.

### Run the project in Production Mode

```bash
npm start
```

> Using any of these commands will run the application at `http://localhost:3000` by default or on the previously configured port.
> 

### Try the application

From now on **you can start using the application**. If you prefer you can load data to the database with the `npm run initdb` command explained here.

## Run tests

The tests are located in the test folder in the root of the project.

To run the tests automatically use the following command.

```bash
npm run test
```

### Coverage test

It is possible to generate a test coverage report with the following command

```bash
npm run coverage
```

It will display a report at the end of the test execution and will generate a static site with the report which can be accessed by clicking on the following path `http://localhost:3000/reports` or the port you set in the environment variables.

## Load example data

You may want to start testing the application on the data loaded into your database. For this you can use the following command.

```bash
npm run initdb
```

The command initially deletes the data loaded in the "pets" table and creates 250 new records by default.

## API Documentation

To view the api documentation run the following command

```bash
npm run docs
```

The execute the application in developmento or production mode to serve the static files of the documentation. To see documentation acc

## Utilities

### Fix lintern errors

```bash
npm run lint
```
### Watch mode to edit documentation

```bash
npm run docs:edit
```
