# Gotedo Backend Test

## How to run/test this project
* ensure you have git installed properly on your machine
* ensure you have node.js installed on your machine
* open your terminal and run `git clone git@github.com:debeemedia/gotedo_support_platform.git`
* run "npm install"
* run "npm run dev" to start the development server
* copy the Server address e.g (http://127.0.0.1:3333) and use as base url for api requests
* run `node ace db:seed` to seed the database with users
* run "npm test" to test
* see .env.example file for necessary environment variables


## Documentation

### Overview
Backend component of a simple customer support platform built with [Adonisjs framework](https://adonisjs.com/).
Database engine: PostgreSQL with [Lucid ORM](https://docs.adonisjs.com/guides/database/introduction)

### Submit a support request form

* Endpoint: `/submit_request`
* Method: `POST`
* Description: Allows a user to submit a support request. If user does not exist in the database, they are created
* Parameters:
 Request body: a JSON object with the keys `email_address`, `first_name`, `last_name`, `title`, `message` and `file_path`. All except `file_path` are mandatory.
* Example of request body:
```
{
  "email_address": "user@example.com",
  "first_name": "Alaye",
  "last_name": "Lagbaja",
  "title": "Test",
  "message": "lorem ipsum"
}
```
* Multipart/form-data: For user-facing forms, file uploads are handled and stored on disk and `file_path` is generated and saved to database
* Example Response:
Status Code: 201 (Created); a JSON Object
```
{
  "success": true,
  "message": "Request submitted successfully"
}
```
