'use strict';
const Database = use('Database')
const chalk = use('chalk');
const User = use('App/Model/User');
const Comment = use('App/Model/Comment');
const Repo = use('App/Model/Repo');


class RepoController {


  * allRepos (request, response) {
      const repos = yield Database.table('repos').orderBy('id', 'desc')
      console.log( chalk.blue('\nAll repositories in database submitted to client\n'))
      return response.json(repos);

  }

}

module.exports = RepoController;
