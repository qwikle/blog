/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import './routes/category'

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ inertia }) => {
  return inertia.render('home')
})

Route.get('/sign-in', 'AuthController.getSignIn').middleware('guest')
Route.post('/sign-in', 'AuthController.signIn').middleware('guest')
Route.get('/sign-up', 'AuthController.getSignUp').middleware('guest')
Route.post('/sign-up', 'AuthController.signUp').middleware('guest')
Route.get('/sign-out', 'AuthController.signOut').middleware('auth')
