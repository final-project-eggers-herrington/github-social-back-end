'use strict'

const Lucid = use('Lucid')

class Repo extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  comment () {
    return this.hasMany('App/Model/Comment')
  }

  repovote () {
    return this.hasMany('App/Model/RepoVote')
  }
}

module.exports = Repo
