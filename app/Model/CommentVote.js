'use strict'

const Lucid = use('Lucid')

class CommentVote extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  comment () {
    return this.hasOne('App/Model/Comment')
  }

}

module.exports = CommentVote
