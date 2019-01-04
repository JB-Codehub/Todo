# TodoAppClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

## Production Web Server

Run `npm run start:Webserver` for a start the web server. The Web Server will be listening in this URL `http://localhost:8080/`. 

## Build

Run `build:Webclient` to build the Angular project. The build artifacts will be stored in the `dist/` directory.

## Start API Server

Run `npm run start:Apiserver` for a start the REST API server. The Server will be listening in this URL `http://localhost:8080/` with following REST API. 

/v1/todo - GET - response -> List of Todo
/v1/todo -  POST - response -> Insert the new Todo and return the Latest the Todo List
/v1/Updatetodo - POST  - response -> Update the selected todo and return the Latest the Todo List
/v1/Deletetodo - POST - response -> Delete the selected Todo and return the Latest the Todo List

