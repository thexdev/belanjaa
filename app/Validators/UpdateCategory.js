'use strict'

class UpdateCategory {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|string',
      icon: 'file_types:image|file_ext:png,svg|file_size:1mb'
    }
  }

  get messages () {
    return {
      'name.required': 'You must provide the category name.',
      'icon.file_ext': 'The file type can only .svg or .png.',
      'icon.file_size': 'The file size cannot greater than 1MB.'
    }
  }
}

module.exports = UpdateCategory
