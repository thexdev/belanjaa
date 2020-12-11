'use strict'

class DashboardController {
  /**
   * Shdow dashboard page.
   *
   * GET /dashboard
   * 
   * @param  {View} ctx.view
   */
  async index ({ view }) {
    return view.render('dashboard.index')
  }
}

module.exports = DashboardController
