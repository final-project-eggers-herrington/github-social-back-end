'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  static get hidden () {
    return ['password']
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  comment () {
    return this.hasMany('App/Model/Comment')
  }

  repo () {
    return this.hasMany('App/Model/Repo')
  }

}

module.exports = User
