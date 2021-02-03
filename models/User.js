const knex = require('../database/connection')
const bcrypt = require('bcrypt')

class User {

  async findAll(){
    try{
      const users = await knex.select().table('users')
      return {success: true, users: users}
    }catch(err){
      return {success: false, err: 'Falha ao consultar banco de dados.'}
    }
  }

  async findById(id){
    try{
      const user = await knex
        .select()
        .table('users')
        .where({id: id})
      if(user.length > 0) return {success: true, user: user[0]}
      else return { success: false, err: 'Usuário não econtrado' }
    }catch(err){
      return {success: false, err: 'Falha ao consultar banco de dados.'}
    }
  }

  async findByEmail(email){
    try{
      const user = await knex
        .select(['id', 'name', 'email', 'password', 'role'])
        .table('users')
        .where({email: email})
      if(user.length > 0) return {success: true, user: user[0]}
      else return { success: false, err: 'Usuário não econtrado' }
    }catch(err){
      return {success: false, err: 'Falha ao consultar banco de dados.'}
    }
  }

  async findEmail(email){
    try{
      const user = await knex.select().table('users').where({email: email})
      if(user.length > 0) return true
      else return false
    }catch(err){
      return {success: false, err: 'Falha ao consultar banco de dados.'}
    }
  }

  async create(name, email, password){
    try{
      const passwordHash = await bcrypt.hash(String(password), 10)
      await knex
        .insert({name: name, email: email, password: passwordHash})
        .table('users')
      return { success: true }
    }catch(err){
      console.log(err)
      return { success: false, err: 'Falha ao consultar banco de dados.' }
    }
  }

  async delete(id){
    try{
      await knex.delete().table('users').where({id: id})
      return { success: true }
    }catch(err){
      return { success: false, err: 'Falha ao consultar banco de dados.' }
    }
  }

  async update(user){
    try{
      await knex.update({name: user.name, email: user.email}).table('users').where({id: user.id})
      return { success: true }
    }catch(err){
      return { success: false, err: err }
    }
  }

}

module.exports = new User()
