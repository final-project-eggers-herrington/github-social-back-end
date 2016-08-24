'use strict';
const Database = use('Database')
const chalk    = use('chalk');
const User     = use('App/Model/User');
const Comment  = use('App/Model/Comment');
const Repo     = use('App/Model/Repo');
const _        = require ('lodash');

class RepoController {

  * updateRepo (request, response) {
    let repo        = yield Repo.findBy('id', request.param('id'))
    let user        = request.authUser
    let edited_repo = request.only('user_description')
    if (user.id === repo.user_id) {
      repo = _.merge(repo, edited_repo)
      yield repo.save()
      response.json(repo.toJSON())
    } else {
      response.status(401).json()
    }
  }

  * deleteRepo (request, response) {
    const input   = request.only ('repo_id')
    const user    = request.authUser
    const repo_id = input.repo_id
    const search  = yield Database.table('repos').where('id', repo_id)
    const repo    = search[0]
    const res     = {}
    res.repo = repo, res.user = user

    console.log(chalk.red('\nDELETE REPO REQUEST') + chalk.blue('\nuser:     ', user.github, user.id, "\nrepoId:", repo_id, "\nrepo:  ", repo.content))
    try{
      if (repo.user_id === user.id) {
        console.log(chalk.red.bold('repo',repo_id, 'will be deleted'))
        yield Database.table('repos').where('id', repo_id).delete()
        return response.json(res);
      } else {
        console.log(chalk.green.bold('repo',repo_id, 'will not be deleted\n'))
        throw new Error('User is not authorized to delete this repo!')
      }
    } catch (e) {
			return response.status(401).json({ error: e.message, res });
		}
  }

  * repoQuery (request, response) {
    const input = request.only ('id')
    const repo = yield Database.from('repos').where('id', input.id)


    // Begin Logging Block
    console.log(chalk.white.dim('\n=============================='))
    console.log(chalk.white.dim('REPOCONTROLLER') + chalk.white.dim(' | ') + chalk.white.dim('repo request'))
    console.log(chalk.white.dim('=============================='))
    console.log(chalk.white.bold('Requested repository id: %s\n'),input.id);
    // End Logging Block
      return response.json(repo);

  }


  * allRepos (request, response) {
      const repos    = yield Database.table('repos').orderBy('id', 'desc')
      const comments = yield Database.table('comments').orderBy('repo_id', 'desc')

      // the forEach loop finds the number of comments for each repo and adds that to the 'comment_total' attribute of each repository
      comments.forEach( function(index) {
        var repoId = index.repo_id
        var i      = _.findIndex(repos, {'id': repoId})
        if (i >= 0) {
          repos[i].comment_total += 1
          console.log("\n+1 to 'comment_total' for repo id ", repos[i].id)
        }
      })
      console.log( chalk.blue('\nAll repositories in database submitted to client\n'))
      return response.json(repos);
    }

  // * allRepos (request, response) {
  //     const repos = yield Database.table('repos').orderBy('id', 'desc')
  //     console.log( chalk.blue('\nAll repositories in database submitted to client\n'))
  //     return response.json(repos);
  //
  // }

}

module.exports = RepoController;
