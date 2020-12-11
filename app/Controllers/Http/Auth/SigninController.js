'use strict'

/**
 * Handle sing in action for user (common) and admin.
 * 
 * @since v0.4.0-alpha
 *
 * @todo support sign in with social media soon.
 * 
 * @author M. Akbar Nugroho <akbarnugroho253@gmail.com>
 */
class SigninController {
  /**
   * Show sign in page. If `type` (query params) is specified with value `admin`,
   * then show sign form for admin instead of user.
   *
   * GET /signin
   *
   * @param {Request} ctx.request
   * @param {View} ctx.view
   */
  index({ request, view }) {
    /**
     * Get the type of sign in form.
     */
    const { type } = request.get()

    return view.render('auth.signin', { type });
  }

  /**
   * Handle user and admin authentication.
   *
   * POST /signin/attempt
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async attempt ({ auth, request, response, view }) {
    const { email, password, remember } = request.post()

    try {
      await auth
        .remember(remember)
        .attempt(email, password)

      /**
       * Redirect to admin dashboard if the authenticated guest is admin.
       */
      if ((await auth.getUser()).is_admin) {
        return response.route('dashboard.index')
      }

      /**
       * Redirect to home if the authenticated guest is user.
       */
      return response.route('frontend.home')
    } catch (e) {
      console.log(e)
      return e;
    }
  }
}

module.exports = SigninController
