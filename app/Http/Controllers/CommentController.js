'use strict';
const Database = use('Database')
const chalk = use('chalk');
const Comment = use('App/Model/Comment');


class CommentController {


  * allComments (request, response) {
      const comments = yield Database.table('comments').orderBy('id', 'desc')
      console.log( chalk.blue('\nAll comments in database submitted to client\n'))
      return response.json(comments);

  }

}

module.exports = CommentController;
