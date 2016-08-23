'use strict'

const Schema = use('Schema')

class CommentVotesSchema extends Schema {

  up () {
    this.create('commentvotes', (table) => {
      table.increments()
      table.integer('comment_id').unsigned().references('id').inTable('comments')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('score')
      table.timestamps()

    })
  }

  down () {
    this.drop('commentvotes')
    }
  }
module.exports = CommentVotesSchema
