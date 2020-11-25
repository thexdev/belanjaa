'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('product_id')
      table.integer('quantity')
      table.enu('status', ['created', 'packing', 'deliver', 'accepted'])
      table.float('subtotal', 12)
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
