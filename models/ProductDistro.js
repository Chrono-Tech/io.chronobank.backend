const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const { withTranslation, applyTranslationHook } = require('../utils')
const Types = keystone.Field.Types

const ProductDistro = new keystone.List('ProductDistro', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

ProductDistro.add({
  name: { type: String, required: true },
  title: { type: String },
  type: { type: Types.Select, options: [
    { value: 'desktop', label: 'Desktop' },
    { value: 'mobile', label: 'Mobile' }
  ]},
  icon: { type: Types.CloudinaryImage },
  url: { type: Types.Url }
},
  'Internationalization',
  withTranslation.withAllTranslations({
    title: { type: String, label: 'Title' },
  })
)

applyTranslationHook(ProductDistro.schema)

ProductDistro.relationship({ ref: 'Product', path: 'product', refPath: 'distros' })

ProductDistro.defaultColumns = 'title, icon, type, url, i18nTranslations'

ProductDistro.schema.post('save', async (d) => {
  if (d.icon && d.icon.secure_url) {
    await download(d.icon.secure_url)
  }
})

ProductDistro.register()
