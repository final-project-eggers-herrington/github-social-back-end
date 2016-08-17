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
Route.post('/post/comment', 'UserController.postComment').middleware('auth')
Route.post('/post/repo', 'UserController.postRepo').middleware('auth')
Route.post('/repo', 'RepoController.repoQuery')
Route.get('/allrepos', 'RepoController.allRepos')
Route.post('/repo/comments', 'CommentController.commentQuery')
Route.get('/allcomments', 'CommentController.allComments')
