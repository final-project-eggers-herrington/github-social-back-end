'use strict'
const Database    = use('Database')
const chalk       = use('chalk');
const User        = use('App/Model/User');
const Comment     = use('App/Model/Comment');
const Repo        = use('App/Model/Repo');
const RepoVote    = use('App/Model/RepoVote')
const CommentVote = use('App/Model/CommentVote')

class VoteController {

 * voteRepo (request, response) {
    // Finds repo upvote is referencing, recognizing authorized user and initializing a new database entry.
    let repo     = yield Repo.findBy('id', request.param('id'))
    let input    = request.only('vote')
    let user     = request.authUser
    const vote   = new RepoVote()
    vote.user_id = user.id
    vote.repo_id = repo
    vote.score   = input.vote
    // let votedArr = yield RepoVote.findby('user_id', user.id) // This is verification stuff (step 2)

    if (input.vote === '1') {
      repo.upvote_count += 1
      vote.score         = 1
      yield vote.save()
      yield repo.save()
      console.log('+1')
      return response.send({vote: 1})
  } else if (input.vote === '-1') {
      repo.upvote_count += -1
      vote.score         = -1
      yield vote.save()
      yield repo.save()
      console.log('-1')
      return response.send({vote: -1})
  } else {
      return response.status(400).send("Bad Request! Endpoint requires '1' or '-1' as a parameter for 'vote'.")
    }
  }

  * voteComment (request, response) {
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
