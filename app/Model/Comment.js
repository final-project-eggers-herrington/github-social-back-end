'use strict'

const Lucid = use('Lucid')

class Comment extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  repo () {
    return this.hasOne('App/Model/Repo')
  }

  parent () {
    this.hasOne('App/Model/Comment')
  }

}

module.exports = Comment
