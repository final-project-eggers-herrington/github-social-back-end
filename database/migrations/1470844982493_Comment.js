'use strict'

const Schema = use('Schema')

class CommentSchema extends Schema {

  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('poster_id').unsigned().references('id').inTable('users')
      table.integer('repo_id').unsigned().references('id').inTable('repos')
      // table.integer('comment_id').unsigned().referenced('id').inTable('comments')
      table.boolean('is_child')
      table.string('content')
      table.string('description')
      table.timestamps('post_date')
    })
  }

  down () {
    this.drop('comments')
  }

}

module.exports = CommentSchema
