'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Shipment extends Model {
  /**
   * Get the order record associated with the shipment.
   */
  order () {
    return this.belongsTo('App/Models/Order')
  }

  /**
   * Get the expedition record associated with the shipment.
   */
  expedition () {
    return this.belongsTo('App/Models/Expedition')
  }
}

module.exports = Shipment
