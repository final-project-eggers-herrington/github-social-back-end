'use strict'

const Schema = use('Schema')

class RepoVotesSchema extends Schema {

  up () {
    this.create('repo_votes', (table) => {
      table.increments()
      table.integer('repo_id').unsigned().references('id').inTable('repos')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('score')
      table.timestamps()

    })
  }

  down () {
    this.drop('repo_votes')
    }
  }

module.exports = RepoVotesSchema
