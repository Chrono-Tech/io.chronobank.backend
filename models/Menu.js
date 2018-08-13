const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const Types = keystone.Field.Types
const { withTranslation, applyTranslationHook } = require('../utils')

const Menu = new keystone.List('Menu', {
  map: { name: 'title' },
  sortable: true
})

Menu.add({
  title: { type: String, required: true },
  subtitle: { type: String },
  url: { type: String },
  symbol: { type: Types.CloudinaryImage },
  icon32x32: { type: Types.CloudinaryImage },
  icon40x40: { type: Types.CloudinaryImage },
  children: { type: Types.Relationship, ref: 'Menu', many: true },
  style: { type: Types.Select, options: [
    { value: 'default', label: 'Default' },
    { value: 'rounded', label: 'Rounded' }
  ]},
}, 'Display Options', {
  isVisibleInHeader: { type: Boolean, label: 'Show in the Header section' },
  isVisibleInFooter: { type: Boolean, label: 'Show in the Footer section' },
  isVisibleInMobile: { type: Boolean, label: 'Show in the Mobile menu' }
},
  'Internationalization',
  withTranslation.withAllTranslations({
    title: { type: String, label: 'Title' },
    subtitle: { type: String, label: 'Subtitle' },
  })
)

Menu.relationship({ ref: 'Menu', path: 'parent', refPath: 'children' })

applyTranslationHook(Menu.schema)

Menu.defaultColumns = 'title, symbol, icon32x32, icon40x40, isVisibleInHeader, isVisibleInFooter, url'

Menu.schema.post('save', async (d) => {
  await Promise.all([d.symbol, d.icon32x32, d.icon40x40]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
    )
})

Menu.register()
