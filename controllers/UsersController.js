require('dotenv-safe').config();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UsersController{

  async login(req, res){
    const {email, password} = req.body

    const result = await User.findByEmail(email)
    if(!result.success){
      res.status(400)
      res.json({success: false, err: result.err})
      return
    }

    const user = result.user
    console.log(user)
    const isPasswordCorrect = await bcrypt.compare(String(password), user.password)
    if(!isPasswordCorrect){
      res.status(400)
      res.json({success: false, err: 'Senha incorreta!'})
      return
    }

    if(user.role != 1){
      res.status(400)
      res.json({success: false, err: 'Usuário não é administrador!'})
      return
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role
    }, process.env.SECRET)

    res.status(200)
    res.json({success: true, token: token})

  }

  async findAll(req, res){
    const result = await User.findAll()
    if(!result.success){
      res.status(400)
      res.json({err: result.err})
      return
    }

    res.status(200)
    res.json({users: result.users})
  }

  async create(req, res){
    const { name, email, password } = req.body

    const isUserRegistered = await User.findEmail(email)
    if(isUserRegistered){
      res.status(400)
      res.json({err: 'Email já cadastrado!'})
      return
    }

    const result = await User.create(name, email, password)
    if(!result.success){
      res.status(400)
      res.json({err: result.err})
      return
    }

    res.sendStatus(200)
  }

  async findById(req, res){
    const id = req.params.id

    const result = await User.findById(id)
    if(!result.success){
      res.status(404)
      res.json({err: result.err})
      return
    }

    res.status(200)
    res.json({user: result.user})
  }

  async delete(req, res){
    const id = req.params.id

    const registeredUser = await User.findById(id)
    if(!registeredUser.success){
      res.status(404)
      res.json({err: registeredUser.err})
      return
    }

    const result = await User.delete(id)
    if(!result.success){
      res.status(404)
      res.json({err: result.err})
      return
    }

    res.sendStatus(200)
  }

  async update(req, res){
    const id = req.params.id
    const {email, name} = req.body
    let user = {}

    const registeredUser = await User.findById(id)
    if(!registeredUser.success){
      res.status(404)
      res.json({err: registeredUser.err})
      return
    }

    if(!email) user.email = registeredUser.email
    else user.email = email
    if(!name) user.name = registeredUser.name
    else user.name = name
    user.id = id

    const updateResult = await User.update(user)
    if(!updateResult.success){
      res.status(404)
      res.json({err: updateResult.err})
      return
    }
    res.sendStatus(200)
  }

}

module.exports = new UsersController()
