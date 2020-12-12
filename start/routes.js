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

  Route.get('/categories', 'CategoryController.index').as('dashboard.category.index')
  Route.get('/categories/add', 'CategoryController.add').as('dashboard.category.add')
  Route.post('/categories/store', 'CategoryController.store').as('dashboard.category.store')
  Route.get('/categories/edit/:id', 'CategoryController.edit').as('dashboard.category.edit')
  Route.put('/categories/udpate/:id', 'CategoryController.update').as('dashboard.category.update')
  Route.delete('/categories/delete/:id', 'CategoryController.delete').as('dashboard.category.delete')

  Route.get('/expeditions', 'ExpeditionController.index').as('dashboard.expedition.index')
  Route.get('/expeditions/add', 'ExpeditionController.add').as('dashboard.expedition.add')
  Route.post('/expeditions/store', 'ExpeditionController.store').as('dashboard.expedition.store').validator('StoreExpedition')
  Route.get('/expeditions/edit/:id', 'ExpeditionController.edit').as('dashboard.expedition.edit')
  Route.put('/expeditions/update/:id', 'ExpeditionController.update').as('dashboard.expedition.update').validator('StoreExpedition')
  Route.delete('/expeditions/delete/:id', 'ExpeditionController.destroy').as('dashboard.expedition.delete')
})
  .namespace('Admin')
