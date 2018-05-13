# eye_exercises
Eye exercises app

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
JWT-passport
bootstrap

Configuration file: config/default.json

1. To run the app: npm install & npm start
2. Go to: http://localhost:3100/

The configuration variables needs to be set into enviroment variables.
The variables are:
db_pass,db_user for connectiong to the database 
secret_jwt_key to generate a signed web tokens to login

##Users

There are 2 types of users:

Administrator: Admin privileges. 
Can see, create, modify or delete users
Can create, modify or delete exercises
Can see exercise list and play exercises

Common user: User privileges. Can see exercise list and play a selected exercise

To run an exercise the browser needs to be in fullscreen mode, so the app width and height is the same as the screen. (F11 keyboard key)

##Exercises

Exercise board
1     2     3
4     5     6
7     8     9
The points define the initial and final location of a part of a movement.

An exercise is composed by:

Exercise Name.

Rest time (in secs)

Number of reps

An exercise is composed by parts

Definition of movement part:

From 

To 

Duration time (in secs)

Blink 

Blink speed (1-16)

Static Static duration