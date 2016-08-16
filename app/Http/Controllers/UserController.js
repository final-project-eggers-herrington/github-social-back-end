'use strict';
const Database = use('Database')
const chalk = use('chalk');
const User = use('App/Model/User');
const Comment = use('App/Model/Comment');
const Repo = use('App/Model/Repo');
const Hash = use('Hash');


class UserController {

// this.create('comments', (table) => {
//   table.increments()
//   table.integer('poster_id').unsigned().references('id').inTable('users')
//   table.integer('repo_id').unsigned().references('id').inTable('repos')
//   table.integer('parent_id').unsigned().references('id').inTable('comments')
//   table.boolean('is_child')
//   table.string('content')
//   table.timestamps()
// +++++++++++++++++++++++
// github,

* postComment (request, response) {
  const input = request.only('content', 'parent_id', 'repo_id')

  try {
    // Attempt to authenticate user based on auth token and subsequently create new repo post
    const user =  request.authUser
    input.user_id = user.id
    input.github = user.github

    const comment = yield Comment.create(input)
    // Begin Logging Block
    console.log(chalk.dim.white('\n================================='))
    console.log(chalk.dim.white('         New Comment Posted'))
    console.log(chalk.dim.white('================================='))
    console.log(chalk.white('Comment Content:','%s','\nemail:          ','%s','\ngithub account:','%s\n'), input.content,request.authUser.email, request.authUser.github);
    // End Logging Block
    return response.json(comment.toJSON())

} catch (e) {
    return response.status(401).json({ error: e.message });
  }
}

  // Recieves repo data from client, adds repo to database with user_id as FK (pulled from request.authUser)
  * postRepo (request, response) {
    const input = request.only('title', 'description', 'language', 'create_date', 'oc_login', 'oc_url')

    try {
      // Attempt to authenticate user based on auth token and subsequently create new repo post
      const user =  request.authUser
      input.user_id = user.id
      input.github = user.github
      const repo = yield Repo.create(input)
      // Begin Logging Block
      console.log(chalk.dim.white('\n=============================='))
      console.log(chalk.dim.white('         New Repo Posted'))
      console.log(chalk.dim.white('=============================='))
      console.log(chalk.white('Repo Title:    ','%s','\nemail:         ','%s','\ngithub account:','%s\n'), input.title,request.authUser.email, request.authUser.github);
      // End Logging Block
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
		console.warn('\n',input.email, 'logged in!')

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
