'use strict';

const User = use('App/Model/User');
const Hash = use('Hash');

class UserController {

  * show (request, response) {
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
  }

  * login (request, response) {
    // Get the input from the user
    const input = request.only('email', 'password');

    try {
      // Find the user by email
      const user = yield User.findBy('email', input.email);
      // Verify their passwords matches & if not, let em know
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