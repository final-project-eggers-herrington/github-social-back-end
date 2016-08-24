'use strict'
const Database    = use('Database')
const chalk       = use('chalk');
const User        = use('App/Model/User');
const Comment     = use('App/Model/Comment');
const Repo        = use('App/Model/Repo');
const RepoVote    = use('App/Model/RepoVote')
const CommentVote = use('App/Model/CommentVote')

class VoteController {

  voteRepo (request, response) {
    let repo  = yield Repo.findBy('id', request.param('id'))
    let input = request.only('upvote')
    let user  = request.authUser
    if (input.upvote === 1) {
      let vote  = yield Database.insert({repo_id: repo, user_id: user.id, score: 1 }).into('repovotes')
    } else {
      let vote  = yield Database.insert({repo_id: repo, user_id: user.id, score: -1 }).into('repovotes')
    }
  }

  voteComment (request, response) {
    let input   = request.only('vote')
    let comment = yield Comment.findBy('id', request.param('id'))
    let user    = request.authUser
    let voted   = yield CommentVote.findby('user_id', user.id)

    console.log('\ncomment: ', comment)
    console.log('\nuser: ', user)
    console.log('\nvoted: ', voted)


  }

}

module.exports = VoteController
