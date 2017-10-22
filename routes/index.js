const keystone = require('keystone')
const middleware = require('./middleware')
const restful = require('restful-keystone')(keystone, {
  root: '/api/v1',
})

const Product = keystone.list('Product')
const Header = keystone.list('Header')
const Story = keystone.list('Story')

// Common Middleware
keystone.pre('routes', middleware.initLocals)
keystone.pre('render', middleware.flashMessages)

// Setup Route Bindings
exports = module.exports = function (app) {

  app.all('/api/v1/*', keystone.middleware.cors)

  app.get('/', (req, res) => {
    res.redirect('/keystone/')
  })

  app.get('/api/v1/products/s/:slug', async (req, res) => {
    const product = await Product.model
      .findOne({
        'slug': req.params.slug
      })
      .populate('downloads')
      .exec()
    res.send(product)
  })

  app.get('/api/v1/headers/s/:slug', async (req, res) => {
    const product = await Header.model
      .findOne({
        'slug': req.params.slug
      })
      .exec()
    res.send(product)
  })

  app.get('/api/v1/stories/s/:slug', async (req, res) => {
    const product = await Story.model
      .findOne({
        'slug': req.params.slug
      })
      .exec()
    res.send(product)
  })

  restful.expose({
    Article: {
      methods: ['list', 'retrieve']
    },
    Feature: {
      methods: ['list', 'retrieve']
    },
    Job: {
      methods: ['list', 'retrieve']
    },
    Member: {
      methods: ['list', 'retrieve']
    },
    Partner: {
      methods: ['list', 'retrieve']
    },
    Post: {
      methods: ['list', 'retrieve'],
      populate: ['categories', 'author'],
    },
    Product: {
      methods: ['list', 'retrieve'],
      populate: ['downloads', 'features'],
    },
    Statistic: {
      methods: ['list', 'retrieve']
    },
    Header: {
      methods: ['list', 'retrieve'],
    },
    Story: {
      methods: ['list', 'retrieve'],
    },
    Testimonial: {
      methods: ['list', 'retrieve'],
    },
    Iteration: {
      methods: ['list', 'retrieve'],
    }
  }).start()
}
