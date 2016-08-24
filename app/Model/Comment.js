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
    return this.hasOne('App/Model/Comment')
  }

  commentvote () {
    return this.hasMany('App/Model/CommentVote')
  }
}

module.exports = Comment
