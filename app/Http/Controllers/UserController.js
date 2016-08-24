'use strict';
const Database = use('Database')
const chalk    = use('chalk');
const User     = use('App/Model/User');
const Comment  = use('App/Model/Comment');
const Repo     = use('App/Model/Repo');
const Hash     = use('Hash');

class UserController {


  // Recieves comment data from client, adds comment to database with user_id as FK (pulled from request.authUser)
* postComment (request, response) {
  const input = request.only('content', 'parent_id', 'repo_id')

  try {
    // Attempt to authenticate user based on auth token and subsequently create new comment
    const user    =  request.authUser
    input.user_id = user.id
    input.github  = user.github
    console.log(input.parent_id)
    if (input.parent_id) {input.is_child = true}
    else {input.is_child = false}
    const comment = yield Comment.create(input)

    // Begin Logging Block
    console.log(chalk.blue('\n=============================='))
    console.log(chalk.blue('      New Comment Posted'))
    console.log(chalk.blue('=============================='))
    console.log(chalk.dim.white(' Comment content: ') + chalk.white('%s') + chalk.dim.white('\n           email: ') + chalk.white('%s') + chalk.dim.white('\n  github account: ') + chalk.white('%s') + chalk.dim.white('\n        is_child: ') + chalk.white("%s\n"), input.content,request.authUser.email, request.authUser.github, input.is_child);
    // End Logging Block
    return response.json(comment.toJSON())

} catch (e) {
    return response.status(401).json({ error: e.message });
  }
}


  // Recieves repo data from client, adds repo to database with user_id as FK (pulled from request.authUser)
  * postRepo (request, response) {
    const input = request.only('title', 'description','user_description' , 'language', 'create_date', 'oc_login', 'oc_url', 'repo_url')

    try {
      // Attempt to authenticate user based on auth token and subsequently create new repo post
      const user    =  request.authUser
      input.user_id = user.id
      input.github  = user.github
      const repo    = yield Repo.create(input)
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

		try {
			// Find the user by email
			const user = yield User.findBy('email', input.email);
			// Verify their passwords matches
			const verify = yield Hash.verify(input.password, user.password);
			if (!verify) { throw new Error('Password mismatch') };
			// Generate a token
			user.access_token = yield request.auth.generate(user);
      console.warn('\n',input.email, 'logged in!')

			return response.json(user.toJSON());
		} catch (e) {
			return response.status(401).json({ error: e.message });
		}
	}
}

module.exports = UserController;
