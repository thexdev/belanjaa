'use strict'

const Category = use('App/Models/Category')
const Drive = use('Drive')
const Helpers = use('Helpers')

const _ = require('lodash')

class CategoryController {
  /**
   * Show all product category.
   * 
   * GET /dashboard/categories
   * GET /dashboard/categories?q=
   * 
   * @param {Request} ctx.request
   * 
   * @return {View}
   */
  async index ({ request, view }) {
    let categories
    const query = request.get()
    const getPage = ({ page }) => _.isEqual(page, 0) ? 1 : page

    if (_.has(query, 'q')) {
      categories = await Category
        .query()
        .select('id', 'name', 'icon', 'updated_at')
        .where('name', 'like', `%${query.q}%`)
        .orderBy('name', 'asc')
        .paginate(getPage(query), 15)
    } else {
      categories = await Category
        .query()
        .select('id', 'name', 'icon', 'updated_at')
        .orderBy('name', 'asc')
        .paginate(getPage(query), 15)
    }

    return view.render('dashboard.category.index', { categories: categories.toJSON() })
  }

  /**
   * Show add product category page.
   * 
   * GET /dashboard/categories/add
   * 
   * @param {View} ctx.view
   */
  async add ({ view }) {
    return view.render('dashboard.category.add')
  }

  /**
   * Store new category into database.
   * 
   * POST /dashboard/categories/store
   * 
   * @param {Session}  ctx.session
   * @param {Request}  ctx.request
   * @param {Response} ctx.response
   */
  async store ({ session, request, response }) {
    const { name } = request.post()
    const icon = request.file('icon')

    await icon.move(Helpers.publicPath('img/icon'), {
      name: `${new Date().getTime().toString()}.${icon.subtype}`
    })

    if (!icon.moved()) {
      session.flash({ error: 'Failed to upload icon.' })

      return response.route('dashboard.category.add')
    }

    await Category.create({ name, icon: `img/icon/${icon.fileName}` })

    session.flash({ notification: 'Successfully added new category.' })

    return response.route('back')
  }

  /**
   * Show edit page.
   *
   * GET /dashboard/catetories/edit/:id
   *
   * @param  {Params} ctx.params
   * @param  {View}   ctx.view
   */
  async edit ({ params, view }) {
    const category = await Category
      .query()
      .select('id', 'name', 'icon')
      .where('id', params.id)
      .first()

    return view.render('dashboard.category.edit', { category: category.toJSON() })
  }

  /**
   * Update category.
   *
   * PUT /dashboard/categories/:id
   *
   * @param  {Session}  ctx.session
   * @param  {Params}   ctx.params
   * @param  {Request}  ctx.request
   * @param  {Response} ctx.response
   */
  async update ({ session, params, request, response }) {
    const { name } = request.post()
    const icon = request.file('icon')

    /**
     * update category without icon.
     */
    if (icon === null) {
      await Category
        .query()
        .where('id', params.id)
        .update({ name })

      session.flash({ notification: 'Successfully updated an category.' })

      return response.route('back')
    }

    /**
     * otherwise update category with icon.
     */
    const category = await Category.find(params.id)

    if (await Drive.exists(Helpers.publicPath(category.icon))) {
      await Drive.delete(Helpers.publicPath(category.icon))
    }

    await icon.move(Helpers.publicPath('img/icon'),  {
      name: `${new Date().getTime().toString()}.${icon.subtype}`
    })

    if (!icon.moved()) {
      session.flash({ error: icon.error() })
      
      return response.route('back')
    }

    category.name = name
    category.icon = `img/icon/${icon.fileName}`
    await category.save()

    session.flash({ notification: 'Successfully updated an category' })

    return response.route('back')
  }

  /**
   * Delete category.
   *
   * DELETE /categories/delete/:id
   *
   * @param  {Session}  ctx.session
   * @param  {Params}   ctx.params
   * @param  {Response} ctx.response
   */
  async destroy ({ session, params, response }) {
    const category = await Category.find(params.id)

    if (await Drive.exists(Helpers.publicPath(category.icon))) {
      await Drive.delete(Helpers.publicPath(category.icon))
    }

    await category.delete()

    session.flash({ notification: 'Successfully deleted an category.' })

    return response.route('back')
  }
}

module.exports = CategoryController
