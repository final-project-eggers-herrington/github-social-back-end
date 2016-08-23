'use strict'

const Lucid = use('Lucid')

class RepoVote extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  repo () {
    return this.hasOne('App/Model/Repo')
  }

}

module.exports = RepoVote
