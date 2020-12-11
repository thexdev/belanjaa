'use strict'

class HomeController {
  /**
   * Show home page.
   */
  index({ request, response, view }) {
    return view.render('frontend.home')
  }
}

module.exports = HomeController
