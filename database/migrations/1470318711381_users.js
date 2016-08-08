'use strict'

const Schema = use('Schema')

class UsersSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.dropColumn('firstname');
      table.dropColumn('lastname');
    })
  }

  down () {
    this.table('users', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = UsersSchema
