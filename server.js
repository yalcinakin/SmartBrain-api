/*
/   res= Working
/signin  POST = success/fail
/register  POST = user
/profile/:userid  GET = user
/image   PUT user

*/

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '12345',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  db.select('*').from('users').then(data => {
    res.json(data);
  });
})

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
// app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image',  (req, res) => {image.handleImage(req, res, db)} )
app.post('/imageurl',  (req, res) => {image.handleApiCall(req, res)} )

app.listen(process.env.PORT || 3000, () => {  //3000
  console.log(`app is running on PORT ${process.env.PORT}`);
});




// db.select('*').from('users').then(data => {
//   console.log(data);
// });

// const database = {
//   users: [
//     {
//       id: '123',
//       name: 'John',
//       email: 'john@gmail.com',
//       password: 'cookies',
//       entries: 0,
//       joined: new Date()
//     },
//     {
//       id: '124',
//       name: 'Sally',
//       email: 'sally@gmail.com',
//       password: 'bananas',
//       entries: 0,
//       joined: new Date()
//     }
//   ],
//   login: [
//     {
//       id: "987",
//       hash: "",
//       email: "john@gmail.com"
//     }
//   ]
// }

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
