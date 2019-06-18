
const handleProfileGet = (req, res, db) => {
  db.select('*').from('users').where('id', '=', req.params.id).then(user => {
    if(user.length){
      res.json(user[0])
    }
    else {
      res.status(404).json("NOT FOUND");
    }
  })
  .catch(err => res.status(400).json("error getting user"))
}

const handleProfileUpdate = (req, res, db) => {
  const {id} = req.params;
  const {name, age, pet} = req.body.formInput;

  db('users')
    .where({ id })
    .update({ name, age, pet })
    .then(resp => {
      if(resp){
        res.json("success")
      }
      else {
        res.status(400).json("Unable to Update");
      }
    })
    .catch(err => res.status(400).json("error updating profile"))
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate
}

//
// const handleProfileGet = (req, res, db) => {
//   const { id } = req.params;
//   db.select('*').from('users').where({id})
//     .then(user => {
//       if (user.length) {
//         res.json(user[0])
//       } else {
//         res.status(400).json('Not found')
//       }
//     })
//     .catch(err => res.status(400).json('error getting user'))
// }
//
// module.exports = {
//   handleProfileGet
// }
