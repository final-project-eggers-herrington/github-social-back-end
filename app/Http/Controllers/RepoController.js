'use strict';
const Database = use('Database')
const chalk = use('chalk');
const User = use('App/Model/User');
const Comment = use('App/Model/Comment');
const Repo = use('App/Model/Repo');


class RepoController {

  * repo (request, response) {
    const input = request.only ('id')
    const repo = yield Database.from('repos').where('id', input.id)


    // Begin Logging Block
    console.log(chalk.white.dim('\n=============================='))
    console.log(chalk.white.dim('USERCONTROLLER') + chalk.white.dim(' | ') + chalk.white.dim('repo request'))
    console.log(chalk.white.dim('=============================='))
    console.log(chalk.white.bold('Requested repository id: %s\n'),input.id);
    // End Logging Block
      return response.json(repo);

  }


  * allRepos (request, response) {
      const repos = yield Database.table('repos').orderBy('id', 'desc')
      console.log( chalk.blue('\nAll repositories in database submitted to client\n'))
      return response.json(repos);

  }

}

module.exports = RepoController;
