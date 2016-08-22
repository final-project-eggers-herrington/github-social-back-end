'use strict';
const Database = use('Database')
const chalk    = use('chalk');
const Comment  = use('App/Model/Comment');
const _        = require('lodash');

class CommentController {

  * updateComment (request, response) {
    let comment        = yield Comment.findBy('id', request.param('id'))
    let user           = request.authUser
    let edited_comment = request.only('content')
    if (user.id === comment.user_id) {
      comment = _.merge(comment, edited_comment)
      yield comment.save()
      response.json(comment.toJSON())
    } else {
      response.status(401).json()
    }
  }

  * deleteComment (request, response) {
    const input       = request.only ('comment_id')
    const user        = request.authUser
    const comment_id  = input.comment_id
    const search      = yield Database.table('comments').where('id', comment_id)
    const comment     = search[0]
    const res         = {}
    res.comment = comment, res.user = user

    console.log(chalk.red('\nDELETE COMMENT REQUEST') + chalk.blue('\nuser:     ', user.github, user.id, "\ncommentId:", comment_id, "\ncomment:  ", comment.content))
    try{
      if (comment.user_id === user.id) {
        console.log(chalk.red.bold('comment',comment_id, 'will be deleted'))
        yield Database.table('comments').where('id', comment_id).delete()
        return response.json(res);
      } else {
        console.log(chalk.green.bold('comment',comment_id, 'will not be deleted\n'))
        throw new Error('User is not authorized to delete this comment!')
      }
    } catch (e) {
			return response.status(401).json({ error: e.message, res });
		}
  }


  * allComments (request, response) {
      const comments = yield Database.table('comments').orderBy('id', 'desc')
      console.log( chalk.blue('\nAll comments in database submitted to client\n'))
      return response.json(comments);
  }


  * commentQuery (request, response) {
    const input    = request.only ('repo_id')
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
