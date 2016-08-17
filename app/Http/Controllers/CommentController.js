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

  * commentQuery (request, response) {
    const input = request.only ('repo_id')
    const comments = yield Database.from('comments').where('repo_id', input.repo_id)

    // Begin Logging Block
    console.log(chalk.white.dim('\n==================================='))
    console.log(chalk.white.dim('COMMENTCONTROLLER') + chalk.white.dim(' | ') + chalk.white.dim('comment request'))
    console.log(chalk.white.dim('==================================='))
    console.log(chalk.white.bold('Requested comment repo_id: %s\n'),input.repo_id);
    // End Logging Block
      return response.json(comments);
  }

}

module.exports = CommentController;
