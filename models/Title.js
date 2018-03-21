const keystone = require('keystone')
const Types = keystone.Field.Types
const { withTranslation, applyTranslationHook } = require('../utils')

const Title = new keystone.List('Title', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

Title.add({
  name: { type: String, required: true },
  title: { type: String },
  subtitle: { type: String },
  stereotype: { type: Types.Select, options: [
      { value: 'default', label: 'h1' },
      { value: 'h2', label: 'h2' },
      { value: 'h3', label: 'h3' },
      { value: 'h4', label: 'h4' },
      { value: 'h5', label: 'h5' },
      { value: 'h6', label: 'h6' },
  ]},
},
  'Internationalization',
  withTranslation.withAllTranslations({
    title: { type: String, label: 'Title' },
    subtitle: { type: String, label: 'Subtitle' },
  })
)

applyTranslationHook(Title.schema)

Title.register()
