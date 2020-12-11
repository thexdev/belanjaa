'use strict'

class StoreExpedition {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|string',
      packet: 'required|string'
    }
  }

  get messages () {
    return {
      'name.required': 'You must provide the expedition name.',
      'packet.required': 'You must provide the expedition packet.'
    }
  }
}

module.exports = StoreExpedition
