'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  /**
   * Get the category record associated with the product.
   */
  category () {
    return this.belongsTo('App/Models/Category')
  }
}

module.exports = Product
