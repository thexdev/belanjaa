'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  /**
   * Get the user record associated with the order.
   */
  user () {
    return this.belongsTo('App/Models/User')
  }

  /**
   * Get the product record associated with the order.
   */
  product () {
    return this.belongsTo('App/Models/Product')
  }

  /**
   * Get the shipment record associated with the order.
   */
  shipment () {
    return this.hasOne('App/Models/Shipment')
  }
}

module.exports = Order
