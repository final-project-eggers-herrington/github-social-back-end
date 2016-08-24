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
    vote.repo_id = repo.id
    vote.score   = input.vote
    // let votedArr = yield RepoVote.findby('user_id', user.id) // This is verification stuff (step 2)

    // This logic detects if a vote is +1, -1 or other, and performs the correct operation (upvote, downvote or return an error)
    if (input.vote === "1" || input.vote === 1) {
      repo.upvote_count += 1
      vote.score         = 1
      yield vote.save()
      yield repo.save()
      console.log('\n repo upvote ', repo.id)
      return response.json(vote.toJSON())
  } else if (input.vote === "-1" || input.vote === -1) {
      repo.upvote_count += -1
      vote.score         = -1
      yield vote.save()
      yield repo.save()
      console.log('\n repo downvote ', repo.id)
      return response.json(vote.toJSON())
  }
  else {
    console.log(chalk.red("\nError! ") + "incorrect type or out of bounds parameter", "\n", typeof input.vote, input.vote)
      return response.status(400).send("Bad Request! Endpoint requires '1' or '-1' as a parameter for 'vote'.")
    }
  }

  * voteComment (request, response) {
     // Finds comment upvote is referencing, recognizing authorized user and initializing a new database entry.
     let comment     = yield Comment.findBy('id', request.param('id'))
     let input       = request.only('vote')
     let user        = request.authUser
     const vote      = new CommentVote()
     vote.user_id    = user.id
     vote.comment_id = comment.id
     vote.score      = input.vote

     // This logic detects if a vote is +1, -1 or other, and performs the correct operation (upvote, downvote or return an error)
     if (input.vote === "1" || input.vote === 1) { //here might be problems
       comment.upvote_count += 1
       vote.score            = 1
       yield vote.save()
       yield comment.save()
       console.log('\n comment upvote ', comment.id)
       return response.json(vote.toJSON())
   } else if (input.vote === "-1" || input.vote === -1) {
       comment.upvote_count += -1
       vote.score            = -1
       yield vote.save()
       yield comment.save()
       console.log('\n comment downvote ', comment.id)
       return response.json(vote.toJSON())
   } else {
     console.log(chalk.red("\nError! ") + "incorrect argument object type or out of bounds parameter", "\n", typeof input.vote, input.vote)
       return response.status(400).send("Bad Request! Endpoint requires '1' or '-1' as a parameter for 'vote'.")
     }
   }

}

module.exports = VoteController
