'use strict'

const Expedition = use('App/Models/Expedition')
const { validate } = use('Validator')

const _ = require('lodash');

class ExpeditionController {
  /**
   * Show all expedition provider.
   *
   * GET /dashboard/expeditions
   * GET /dashboard/expeditions?q=
   *
   * @param {Request} request
   * 
   * @return {View}
   */
  async index ({ request, view }) {
    let expeditions
    const query = request.get()
    const getPage = ({ page }) => _.isEqual(page, '0') ? 1 : page

    if (_.has(query, 'q')) {
      expeditions = await Expedition
        .query()
        .select('id', 'name', 'packet', 'updated_at')
        .where('name', 'like', `%${query.q}%`)
        .orWhere('packet', 'like', `%${query.q}%`)
        .orderBy('name', 'asc')
        .orderBy('packet', 'asc')
        .paginate(getPage(query), 15)
    } else {
      expeditions = await Expedition
        .query()
        .select('id', 'name', 'packet', 'updated_at')
        .orderBy('name', 'asc')
        .orderBy('packet', 'asc')
        .paginate(getPage(query), 15)
    }

    return view.render('dashboard.expedition.index', { expeditions: expeditions.toJSON() })
  }

  /**
   * Show add expedition provider page.
   *
   * GET /dashboard/expeditions/add
   * 
   * @param  {View}  ctx.view
   */
  async add ({ view }) {
    const providers = await Expedition
      .query()
      .select('name')
      .distinct()
      .orderBy('name', 'asc')
      .fetch()

    return view.render('dashboard.expedition.add', { providers: providers.toJSON() })
  }

  /**
   * Store new expedition into database.
   *
   * POST /dashboard/expeditions/store
   *
   * @param  {Session}  ctx.session
   * @param  {Request}  ctx.request
   * @param  {Response} ctx.response
   */
  async store ({ session, request, response }) {
    const { name, packet } = request.post()

    await Expedition.create({ name, packet })
    session.flash({ notification: 'Successfully added new expedition.' })

    return response.route('back')
  }

  /**
   * Show edit page.
   *
   * GET /dashboard/expeditions/edit/:id
   *
   * @param  {Params} ctx.params
   * @param  {View}   ctx.view
   */
  async edit ({ params, view }) {
    const provider = await Expedition
      .query()
      .select('id', 'name', 'packet')
      .where('id', params.id)
      .first()

    return view.render('dashboard.expedition.edit', { provider: provider.toJSON() })
  }

  /**
   * Update expedition.
   *
   * PUT /dashboard/expeditions/:id
   *
   * @param  {Session}  ctx.session
   * @param  {Params}   ctx.params
   * @param  {Request}  ctx.request
   * @param  {Response} ctx.response
   */
  async update ({ session, params, request, response }) {
    const { name, packet } = request.post()

    await Expedition
      .query()
      .where('id', params.id)
      .update({ name, packet })

    session.flash({ notification: 'Successfully updated an expedition' })

    return response.route('dashboard.expedition.index')
  }

  /**
   * Delete expedition.
   *
   * DELETE /expeditions/delete/:id
   *
   * @param  {Session}  ctx.session
   * @param  {Params}   ctx.params
   * @param  {Response} ctx.response
   */
  async destroy ({ session, params, response }) {
    const expeditionId = params.id

    await Expedition
      .query()
      .where('id', expeditionId)
      .delete()

    session.flash({ notification: 'Successfully deleted an expedition.' })

    return response.route('back')
  }
}

module.exports = ExpeditionController
