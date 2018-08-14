// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config()

// Require keystone
const keystone = require('keystone')
const config = require('config')
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
  'name': 'backend.chronobank.io',
  'brand': 'Chronobank.io',
  'mongo': config.get('storage.url'),

  'sass': 'public',
  'static': ['public', config.get('uploads.dir')],
  'favicon': 'public/favicon.ico',
  'signin logo': ['/logo.svg', 279, 33], // relative to public directory

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',

  'cookie secret': config.get('keystone.cookieSecret'),
  'cloudinary config': config.get('cloudinary.url'),
})

// Load your project's Models
keystone.import('models')

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
})

keystone.set('cors allow origin', true)

// Load your project's Routes
keystone.set('routes', require('./routes'))


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  general: ['stories', 'features', 'statistics', 'headers', 'iterations'],
  products: ['products', 'product-downloads', 'product-distros', 'product-features', 'product-descriptions', 'product-links'],
  faq: ['faq-topics', 'faq-questions'],
  chronomint: ['mint-translations'],
  media: ['posts', 'post-categories', 'articles', 'galleries', 'gallery-images'],
  references: ['testimonials', 'partners', 'exchanges', 'members', 'jobs', 'constants', 'socials', 'files', 'papers'],
  enquiries: ['enquiries', 'applications', 'subscriptions', 'reports'],
  users: 'users',
})

// Start Keystone to connect to your database and initialise the web server

keystone.start()
