'use strict'

const Category = use('App/Models/Category')
const Product = use('App/Models/Product')

const _ = require('lodash')
class ProductController {
  /**
   * Show all available product.
   * 
   * GET /dashboard/product
   * GET /dashboard/product?q=
   * 
   * @param {Request} ctx.request
   * @param {View}    ctx.view
   */
  async index({ request, view }) {
    let products

    const query = request.get()
    const getPage = ({ page }) => _.isEqual(page, '0') ? 1 : page

    if (_.has(query, 'q')) {
      products = await Product
        .query()
        .select('id', 'name', 'stock', 'price', 'updated_at')
        .where('name', 'like', `%${query.q}%`)
        .orWhere('description', 'like', `%${query.q}%`)
        .orderBy('name')
        .paginate(getPage(query), 15)
    } else {
      products = await Product
        .query()
        .select('id', 'name', 'stock', 'price', 'updated_at')
        .orderBy('name', 'asc')
        .paginate(getPage(query), 15)
    }

    return view.render('dashboard.product.index', { products: products.toJSON() })
  }

  /**
   * Show add product page.
   * 
   * GET /products/add
   * 
   * @param {View} ctx.view
   */
  async add({ view }) {
    let categories = await Category
      .query()
      .select('id', 'name')
      .fetch()

    return view.render('dashboard.product.add', { categories: categories.toJSON() })
  }
}

module.exports = ProductController
