'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

// User Registration & Login
Route.post('/register', 'UserController.store')
Route.post('/login', 'UserController.login')
Route.get('/profile', 'UserController.show').middleware('auth')

// User posting
Route.post('/post/comment', 'UserController.postComment').middleware('auth')
Route.post('/post/repo', 'UserController.postRepo').middleware('auth')

// Getting comments and repos from database
Route.post('/repo', 'RepoController.repoQuery')
Route.post('/repo/comments', 'CommentController.commentQuery')
Route.get('/allrepos', 'RepoController.allRepos')
Route.get('/allcomments', 'CommentController.allComments')

// Post Management
Route.post('/delete/comment', 'CommentController.deleteComment').middleware('auth')
Route.post('/delete/repo', 'RepoController.deleteRepo').middleware('auth')
Route.put('/post/comment/:id', 'CommentController.updateComment').middleware('auth') // edit comment
Route.put('/post/repo/:id', 'RepoController.updateRepo').middleware('auth')          // edit repo

// Voting
Route.put('/vote/repo/:id', 'VoteController.voteRepo').middleware('auth')             //'upvote':-1 or 1
Route.put('/vote/comment/:id', 'VoteController.voteComment').middleware('auth')
