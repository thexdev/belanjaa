'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/signin', 'SigninController.index').as('auth.signin')
  Route.post('/signin/attempt', 'SigninController.attempt').as('auth.attempt')
})
  .namespace('Auth')

Route.group(() => {
  Route.get('/', 'HomeController.index').as('frontend.home')
})
  .namespace('Frontend')

Route.group(() => {
  Route.get('/dashboard', 'DashboardController.index').as('dashboard.index')

  Route.get('/expeditions', 'ExpeditionController.index').as('dashboard.expedition.index')
  Route.get('/expeditions/add', 'ExpeditionController.add').as('dashboard.expedition.add')
  Route.post('/expeditions/store', 'ExpeditionController.store').as('dashboard.expedition.store')
  Route.get('/expeditions/edit/:id', 'ExpeditionController.edit').as('dashboard.expedition.edit')
  Route.put('/expeditions/update/:id', 'ExpeditionController.update').as('dashboard.expedition.update')
  Route.delete('/expeditions/delete/:id', 'ExpeditionController.destroy').as('dashboard.expedition.delete')
})
  .namespace('Admin')
