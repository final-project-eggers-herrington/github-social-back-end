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

  repovotes () {
    return this.hasMany('App/Model/RepoVote')
  }

  commentvotes () {
    return this.hasMany('App/Model/CommentVote')
  }

}

module.exports = User
