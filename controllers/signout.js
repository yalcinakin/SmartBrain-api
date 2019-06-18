
const deleteToken = (client) => (req, res) => {
  const {authorization} = req.headers;

  if(authorization){
    client.del(authorization);
  }
  res.json("success");
}

module.exports = {
  deleteToken
}
