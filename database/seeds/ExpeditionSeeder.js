'use strict'

/*
|--------------------------------------------------------------------------
| ExpeditionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ExpeditionSeeder {
  async run () {
    await Factory.model('App/Models/Expedition').createMany(5)
  }
}

module.exports = ExpeditionSeeder
