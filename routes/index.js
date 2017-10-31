const keystone = require('keystone')
const middleware = require('./middleware')
const restful = require('restful-keystone')(keystone, {
  root: '/api/v1',
})

const Product = keystone.list('Product')
const Enquiry = keystone.list('Enquiry')
const Header = keystone.list('Header')
const Story = keystone.list('Story')
const FaqTopic = keystone.list('FaqTopic')
const FaqQuestion = keystone.list('FaqQuestion')

const FaqQuestionIndex = require('../index/FaqQuestionIndex')

// Common Middleware
keystone.pre('routes', middleware.initLocals)
keystone.pre('render', middleware.flashMessages)

// Setup Route Bindings
exports = module.exports = function (app) {

  app.all('/api/v1/*', keystone.middleware.cors)

  app.options('/api/v1/*', (req, res) => {
    res.send(200)
  })

  app.get('/', (req, res) => {
    res.redirect('/keystone/')
  })

  app.get('/api/v1/products/s/:slug', async (req, res) => {
    const product = await Product.model
      .findOne({
        'slug': req.params.slug
      })
      .populate('downloads')
      .populate('distros')
      .populate('features')
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

  // eslint-disable-next-line
  app.get('/api/v1/faq-questions/search', async (req, res) => {
    const page = await FaqQuestion.model.search(req.query)
    res.send(page)
  })

  app.get('/api/v1/faq-questions/reindex', async (req, res) => {
    await FaqQuestionIndex.clearIndex()
    await FaqQuestionIndex.saveIndex(await FaqQuestion.model.find().exec())
    res.send('OK')
  })

  app.post('/api/v1/enquiries', async (req, res) => {
    const body = req.body
    const persisted = Enquiry.model.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      enquiryType: 'message',
      message: body.message
    })
    res.send(persisted)
  })

  app.get('/api/v1/faq-topics', async (req, res) => {
    const topics = await FaqTopic.model
      .find()
      .populate('questions')
      .exec()
    res.send(topics.map(topic => ({
      ...topic.toJSON(),
      questions: [...topic.questions]
    })))
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
    Header: {
      methods: ['list', 'retrieve'],
    },
    Iteration: {
      methods: ['list', 'retrieve'],
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
      populate: ['downloads', 'distros', 'features'],
    },
    Statistic: {
      methods: ['list', 'retrieve']
    },
    Story: {
      methods: ['list', 'retrieve'],
    },
    Testimonial: {
      methods: ['list', 'retrieve'],
    }
  }).start()
}
