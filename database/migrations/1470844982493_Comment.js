'use strict'

const Schema = use('Schema')

class CommentSchema extends Schema {

  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('poster_id').unsigned().references('id').inTable('users')
      table.integer('repo_id').unsigned().references('id').inTable('repos')
      table.boolean('is_child')
      table.string('content')
      table.string('description')
      table.timestamp('post_date')
    })
  }

  down () {
    this.drop('comments')
  }

}

module.exports = CommentSchema
