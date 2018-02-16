var keystone = require('keystone')
const { withTranslation, applyTranslationHook } = require('../utils')

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
  autokey: { from: 'name', path: 'key', unique: true },
})

PostCategory.add({
  name: { type: String, required: true },
},
  'Internationalization',
  withTranslation.all({
    name: { type: String, label: 'Name' },
  })
)

applyTranslationHook(PostCategory.schema)

PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'categories' })

PostCategory.register()
