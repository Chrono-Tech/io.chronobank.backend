const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const withTranslation = require('../utils').withTranslation
const Types = keystone.Field.Types

const Story = new keystone.List('Story', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

Story.add({
  title: { type: String, required: true },
  stereotype: { type: Types.Select, options: [
    { value: 'default', label: 'Default' },
    { value: 'mirrored', label: 'Mirrored' }
  ]},
  background: { type: Types.Select, options: [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' }
  ]},
  image: { type: Types.CloudinaryImage },
  image2x: { type: Types.CloudinaryImage },
  legend: { type: String },
  brief: { type: Types.Html, wysiwyg: true, height: 150 },
},
  'Internationalization',
  withTranslation.all({
    legend: { type: String, label: 'Legend' },
    brief: { type: Types.Html, wysiwyg: true, label: 'Brief', height: 150 }
  })
)

Story.schema.pre('save', function (next) {
  const i18n = {}
  for (const [k, v] of Object.entries(this.i18n.toJSON())) {
    if (v && v.active) {
      i18n[k] = v
    }
  }
  this.i18n = i18n
  this.i18nTranslations = Object.keys(i18n).join(', ')
  next()
})

Story.defaultColumns = 'title, image, legend, i18nTranslations'

Story.schema.post('save', async (d) => {
  await Promise.all([d.image, d.image2x]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
    )
})

Story.register()
