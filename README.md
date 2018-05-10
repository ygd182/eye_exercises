# eye_exercises
eye exercises app

Tech stack:
node-js
mongodb
mongoose
express
html5
css3
jquery
handlebars
lodash
bootstrap

Configuration file: config/default.json

1. To run the app: npm install & npm start
2. Go to: http://localhost:3100/

The configuration variables needs to be set into enviroment variables.
The variables are:
db_pass,db_user for connectiong to the database 
secret_jwt_key to generate a signed web tokens to login

There are 2 types of users:

Administrator: Admin privileges. Can create, modify or delete exercises
Can create, modify or delete users
Can see exercise list and play exercises

Common user: Can see exercise list and play exercises