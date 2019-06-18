
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URI);

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('it is working');
});
app.post('/signin', signin.signinAuthentication(db, redisClient, bcrypt))
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', auth.requireAuth(redisClient), (req, res) => { profile.handleProfileGet(req, res, db)})
app.post('/profile/:id', auth.requireAuth(redisClient), (req, res) => {profile.handleProfileUpdate(req, res, db)})
app.put('/image', auth.requireAuth(redisClient), (req, res) => {image.handleImage(req, res, db)} )
app.post('/imageurl', auth.requireAuth(redisClient), (req, res) => {image.handleApiCall(req, res)} )

app.listen(process.env.PORT || 3001, () => {  //3001
  console.log(`app is running on PORT ${process.env.PORT}`);
});


// db.select('*').from('users').then(data => {
//   console.log(data);
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
