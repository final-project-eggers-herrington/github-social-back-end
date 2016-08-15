'use strict';
const Database = use('Database')
const chalk = use('chalk');
const User = use('App/Model/User');
const Comment = use('App/Model/Comment');
const Repo = use('App/Model/Repo');
const Hash = use('Hash');


class UserController {

  * repo (request, response) {
    const input = request.only ('id')
    const repo = yield Database.from('repos').where('id', input.id)
    console.log('\n==============================')
    console.log(chalk.white.dim('USERCONTROLLER') + chalk.white.bold(' | ') + chalk.white.dim(' repo request'))
    console.log('==============================\n')
    console.log(chalk.red('Requested repository id: %s'),input.id);

    return response.json(repo);

  }


// Recieves repo data from client, adds repo to database with user_id as FK (pulled from request.authUser)
  * post (request, response) {
    const input = request.only('title', 'description', 'language', 'create_date', 'oc_login', 'oc_url')
    try {
      const user =  request.authUser
      input.user_id = user.id
      input.github = user.github

      console.log(chalk.bold.red('\n=============================='))
      console.log(chalk.bold.white('         New Repo Posted'))
      console.log(chalk.bold.red('=============================='))
      console.log(chalk.blue('Repo Title:    ','%s','\nemail:         ','%s','\ngithub account:','%s'), input.title,request.authUser.email, request.authUser.github);

      const repo = yield Repo.create(input)

      return response.json(repo.toJSON())

    } catch (e) {
      return response.status(401).json({ error: e.message });
    }
  }


	* show (request, response) {
    console.log(request.authUser)
		return response.json(request.authUser);
	}

	* store (request, response) {
		// Get the input our user sends in & hash the password
		const input = request.only('email', 'password', 'github');
		input.password = yield Hash.make(input.password);
		// Create a new user
		const user = yield User.create(input);
		// Respond with updated user information
		return response.json(user.toJSON());
		console.warn('New account ', input.email, 'created!');
	}

	* login (request, response) {
		// Get the input from the user
		const input = request.only('email', 'password');
		console.warn(input.email, 'logged in!')

		try {
			// Find the user by email
			const user = yield User.findBy('email', input.email);
			// Verify their passwords matches
			const verify = yield Hash.verify(input.password, user.password);
			if (!verify) { throw new Error('Password mismatch') };
			// Generate a token
			user.access_token = yield request.auth.generate(user);

			return response.json(user.toJSON());
		} catch (e) {
			return response.status(401).json({ error: e.message });
		}
	}
}

module.exports = UserController;
