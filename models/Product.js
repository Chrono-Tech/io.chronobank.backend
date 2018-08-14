const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const { withTranslation, applyTranslationHook } = require('../utils')
const Types = keystone.Field.Types

const Product = new keystone.List('Product', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

Product.add({
  name: { type: String, required: true },
  title: { type: String },
  stereotype: { type: Types.Select, options: [
    { value: 'default', label: 'Default' },
    { value: 'mirrored', label: 'Mirrored' }
  ]},
  background: { type: Types.Select, options: [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' }
  ]},
  icon: { type: Types.CloudinaryImage },
  icon2x: { type: Types.CloudinaryImage },
  iconText: {  type: Types.Html, wysiwyg: true, height: 100 },
  image: { type: Types.CloudinaryImage },
  image2x: { type: Types.CloudinaryImage },
  mission: { type: Types.Html, wysiwyg: true, height: 100 },
  brief: { type: Types.Html, wysiwyg: true, height: 300 },
  downloads: { type: Types.Relationship, ref: 'ProductDownload', many: true },
  distros: { type: Types.Relationship, ref: 'ProductDistro', many: true },
  featuresMode: { type: Types.Select, options: [
    { value: 'default', label: 'List' },
    { value: 'tile', label: 'Tile' }
  ]},
  features: { type: Types.Relationship, ref: 'ProductFeature', many: true },
  descriptions: { type: Types.Relationship, ref: 'ProductDescription', many: true },
  links: { type: Types.Relationship, ref: 'ProductLink', many: true },
},
  'Internationalization',
  withTranslation.withAllTranslations({
    title: { type: String, label: 'Title' },
    mission: { type: Types.Html, wysiwyg: true, label: 'Mission', height: 150 },
    brief: { type: Types.Html, wysiwyg: true, label: 'Brief', height: 150 },
    iconText: { type: String, label: 'Icon Text' },
  })
)

applyTranslationHook(Product.schema)

Product.defaultColumns = 'title, name, icon, image, i18nTranslations'

Product.schema.post('save', async (d) => {
  await Promise.all([d.icon, d.icon2x, d.image, d.image2x]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
    )
})

Product.register()
