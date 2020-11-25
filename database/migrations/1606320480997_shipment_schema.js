'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShipmentSchema extends Schema {
  up () {
    this.create('shipments', (table) => {
      table.increments()
      table.integer('order_id')
      table.text('address')
      table.integer('expedition_id')
      table.float('fee', 12)
      table.text('note').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('shipments')
  }
}

module.exports = ShipmentSchema
