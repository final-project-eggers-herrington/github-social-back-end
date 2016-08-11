'use strict'

const Lucid = use('Lucid')

class Comment extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  repo () {
    return this.belongsTo('App/Model/Repo')
  }

}

module.exports = Comment
