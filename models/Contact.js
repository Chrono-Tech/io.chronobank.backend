const keystone = require('keystone')
const download = require('../utils').download.intoDirectory(process.env.UPLOAD_DIR)
const Types = keystone.Field.Types

const Contact = new keystone.List('Contact', {
  map: { name: 'title' },
  sortable: true
})

Contact.add({
  title: { type: String, required: true },
  icon32x32: { type: Types.CloudinaryImage },
  url: { type: String },
  label: { type: String },
}, 'Display Options', {
  isVisibleInContacts: { type: Boolean, label: 'Show in the Contacts section' },
  isVisibleInFooter: { type: Boolean, label: 'Show in the Footer section' }
})

Contact.defaultColumns = 'title, icon32x32, url'

Contact.schema.post('save', async (d) => {
  if (d.icon32x32 && d.icon32x32.secure_url) {
    await download(d.icon32x32.secure_url)
  }
})

Contact.register()
