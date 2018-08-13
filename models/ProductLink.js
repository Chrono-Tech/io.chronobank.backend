const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const { withTranslation, applyTranslationHook } = require('../utils')
const Types = keystone.Field.Types

const ProductLink = new keystone.List('ProductLink', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

ProductLink.add({
    name: { type: String, required: true },
    text: { type: String },
    link: { type: String },
  },
  'Display Options', {
    isVisibleInHeader: { type: Boolean, label: 'Show in the Header section' },
    isVisibleInContent: { type: Boolean, label: 'Show in the Content section' },
  },
  'Internationalization',
  withTranslation.withAllTranslations({
    text: { type: String, label: 'Text' },
  })
)
applyTranslationHook(ProductLink.schema)

ProductLink.relationship({ ref: 'Product', path: 'product', refPath: 'links' })

ProductLink.schema.post('save', async (d) => {
  await Promise.all([d.image, d.image2x]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
  )
})

ProductLink.register()
