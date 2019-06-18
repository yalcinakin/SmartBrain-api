const jwt = require('jsonwebtoken');

const signinAuthentication = (db, client, bcrypt) => (req, res) => {
  const {authorization} = req.headers;

  return authorization ? getAuthTokenId(req, res, client)
    : handleSignin(db, bcrypt, req, res)
      .then(data => {
        return data.id && data.email ? createSessions(client, data) : Promise.reject(data)
      })
      .then(session => res.json(session))
      .catch(err => res.status(400).json(err));
}

const createSessions = (client, user) => {
  // JWT token, return user data
  const {email, id} = user;
  const token = signToken(email);

  return setToken(client, token, id)
    .then( () => {
      return {success: 'true', userId: id, token: token}
    })
    .catch(console.log);
}

const signToken = (email) => {
  const jwtPayload = {email};

  return jwt.sign(jwtPayload, process.env.JWT_SECRET, {expiresIn: '2 days'});
}

const setToken = (client, token, id) => {
  return Promise.resolve(client.set(token, id))
}

const handleSignin = (db, bcrypt, req,res) => {
  const {email, password} = req.body;
  if(!email || !password){
    return Promise.reject('Incorrect form submission'); //
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if(isValid){
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user =>user[0])
          .catch(err => Promise.reject('Unable to get user'))
      }
      else {
        Promise.reject('wrong credentials')
      }
    })
    .catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = (req, res, client) => {
  const {authorization} = req.headers;

  return client.get(authorization, (err, reply) => {
    if(err || !reply){
      return res.status(400).json("Unauthorized")
    }
    return res.json({id: reply})
  })
}

module.exports = {
  signinAuthentication: signinAuthentication
}
