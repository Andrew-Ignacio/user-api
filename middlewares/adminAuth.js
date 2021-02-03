require('dotenv-safe').config();
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const bearer = req.header('authorization')
  if(!bearer) {
    res.status(401)
    res.json({ success: false, err: 'Permissão negada!' })
    return
  }
  const token = bearer.replace('Bearer ', '')
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err){
      res.status(500)
      res.json({ auth: false, message: 'Token inválido' })
      return
    }
    req.user = decoded
  })
  next()
}
