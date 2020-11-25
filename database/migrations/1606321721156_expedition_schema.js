'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpeditionSchema extends Schema {
  up () {
    this.create('expeditions', (table) => {
      table.increments()
      table.string('name')
      table.string('packet')
      table.timestamps()
    })
  }

  down () {
    this.drop('expeditions')
  }
}

module.exports = ExpeditionSchema
