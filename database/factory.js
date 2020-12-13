'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: '12345678',
    is_admin: data.is_admin || 0
  }
})

Factory.blueprint('App/Models/Category', (faker) => {
  return {
    name: faker.word(),
    icon: 'https://via.placeholder.com/50'
  }
})

Factory.blueprint('App/Models/Expedition', (faker) => {
  return {
    name: faker.word(),
    packet: faker.sentence()
  }
})