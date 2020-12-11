'use strict'

class LogoutController {
  /**
   * @param  {Auth}     ctx.auth
   * @param  {Response} ctx.response
   */
  async logout ({ auth, response }) {
    try {
      await auth.logout()

      return response.route('frontend.home');
    } catch (e) {
      return e;
    }
  }
}

module.exports = LogoutController
