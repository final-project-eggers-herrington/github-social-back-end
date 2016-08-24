'use strict'

const Schema = use('Schema')

class CommentSchema extends Schema {

  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('repo_id').unsigned().references('id').inTable('repos')
      table.integer('parent_id').unsigned().references('id').inTable('comments')
      table.string('github')
      table.boolean('is_child')
      table.string('content')
      table.integer('upvote_count')
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }

}

module.exports = CommentSchema
