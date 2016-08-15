'use strict'

const Lucid = use('Lucid')

class Repo extends Lucid {

  static get hidden () {
    return ['updated_at']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

  comment () {
    return this.hasMany('App/Model/Comment')
  }

}

module.exports = Repo
