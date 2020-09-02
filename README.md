# Food Order Processing

A service for receiving, storing, processing and notifying food orders.

## Technologies

- Nodejs
- PostgreSql
- Docker
- CircleCI

## APIs Integrations

- [Dialog Flow](https://cloud.google.com/dialogflow)
- [Slack](https://slack.com)

## Run locally

### Commands

For running locally, you need to have Docker installed in your computer and then run:

```
npm run start
```

### ENV variables

A **.env** file should be placed at root directory. The following env variables are needed:

```
DB_HOST=localhost // The host were the database will be running
DB_NAME=local // The name of the database
DB_USER=user // The user for database's authentication
DB_PASSWORD=password // The password for database's authentication
DB_PORT=5433 // The database's port
APP_PORT=8080 // The application's port
DATA_FILENAME=projectData.js // The file from which initial data will be loaded into database
```

The DATA_FILENAME is optional and should be placed on a folder **.dbDataLoaders** in root directory. In case this file exists, it should contain a function named **loadData**.


