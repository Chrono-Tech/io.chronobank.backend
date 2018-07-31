const keystone = require('keystone')
const config = require('config')
const _ = require('lodash')
const { parseJson } = require('../utils/lib/parseJson')
const middleware = require('./middleware')
const medium = require('./medium')
const { Message, notifyAboutEnquiry } = require('../mail')
const restful = require('restful-keystone')(keystone, {
  root: '/api/v1',
})

const Gallery = keystone.list('Gallery')
const Product = keystone.list('Product')
const Enquiry = keystone.list('Enquiry')
const Member = keystone.list('Member')
const Partner = keystone.list('Partner')
const Exchange = keystone.list('Exchange')
const Application = keystone.list('Application')
const Report = keystone.list('Report')
const Subscription = keystone.list('Subscription')
const Header = keystone.list('Header')
const Story = keystone.list('Story')
const Language = keystone.list('Language')
const FaqTopic = keystone.list('FaqTopic')
const FaqQuestion = keystone.list('FaqQuestion')
const Menu = keystone.list('Menu')
const Constant = keystone.list('Constant')
const Title = keystone.list('Title')
const MintTranslation = keystone.list('MintTranslation')

const FaqQuestionIndex = require('../index/FaqQuestionIndex')

// Common Middleware
keystone.pre('routes', middleware.initLocals)
keystone.pre('render', middleware.flashMessages)

// Setup Route Bindings
exports = module.exports = function (app) {

  // eslint-disable-next-line
  function errorHandler (err, req, res, next) { // Forced to have 4 arguments due to express convension about error handlers
    // eslint-disable-next-line
    console.log(err)
    res.status(500).send('error', { error: err })
  }

  app.use(errorHandler)

  app.all('/api/v1/*', keystone.middleware.cors)

  app.options('/api/v1/*', (req, res) => {
    res.send(200)
  })

  app.get('/', (req, res) => {
    res.redirect('/keystone/')
  })

  app.get('/api/v1/galleries/s/:slug', async (req, res) => {
    const gallery = await Gallery.model
      .findOne({
        'slug': req.params.slug
      })
      .populate({ path: 'images', options: { sort: { sortOrder: 1 } } })
      .exec()
    res.send({
      ...gallery.toJSON(),
      images: [...gallery.images]
    })
  })

  app.get('/api/v1/galleries', async (req, res) => {
    const galleries = await Gallery.model
      .find({})
      .populate({ path: 'images', options: { sort: { sortOrder: 1 } } })
      .exec()
    res.send({
      galleries: galleries.map(gallery => ({
        ...gallery.toJSON(),
        images: [...gallery.images]
      }))
    })
  })

  app.get('/api/v1/products/s/:slug', async (req, res) => {
    const product = await Product.model
      .findOne({
        'slug': req.params.slug
      })
      .populate('downloads')
      .populate('distros')
      .populate('features')
      .populate('descriptions')
      .exec()
    res.send(product)
  })

  app.get('/api/v1/products', async (req, res) => {
    const products = await Product.model
      .find({})
      .populate('downloads')
      .populate('distros')
      .populate('features')
      .populate('descriptions')
      .exec()
    res.send({
      products
    })
  })

  app.get('/api/v1/headers/s/:slug', async (req, res) => {
    const header = await Header.model
      .findOne({
        'slug': req.params.slug
      })
      .exec()
    res.send(header)
  })

  app.get('/api/v1/headers', async (req, res) => {
    const headers = await Header.model
      .find()
      .exec()
    res.send({
      headers
    })
  })

  app.get('/api/v1/constants', async (req, res) => {
    const constants = await Constant.model
      .find()
      .exec()
    res.send({constants})
  })

  app.post('/api/v1/mintTranslations/import', async (req, res) => {

    if (!req.body) {
      res.status(400).send({ error: 'No body found! It has to be a json raw body.'})
    }

    const updateResult = await MintTranslation.model.update(
        { $and: [{ path: { $ne: '' } }, { isActive: { $eq: true } }]},
        {isActive: false, updatedAt: new Date()},
        { multi: true })
    const languagesJson = Object.entries(req.body)

    languagesJson.forEach(([languageKey, languageData]) => {
      const preparedData = parseJson(languageData)

      preparedData.forEach(async (translation) => {
        let i18nObj = {}
        let translationCurrent = null

        try {
          translationCurrent = await MintTranslation.model
          .findOne()
          .where({ path: { $eq: translation.path }  })
          .exec()
        } catch (error) {}

        if (translationCurrent) {
          i18nObj = translationCurrent.i18n
        }
        i18nObj[languageKey] = {active: true, overrides: {value: translation.translation}}

        let i18nTranslationsArray = []
        for (const [language, value] of Object.entries(i18nObj.toJSON())) {
          if (value && value.active) {
            i18nTranslationsArray.push(language)
          }
        }

        const result = MintTranslation.model.findOneAndUpdate(
          { path: translation.path },
          {...translation, i18nTranslations: i18nTranslationsArray.join(', '), isActive: true, i18n: i18nObj},
          { upsert: true },
          (err) => {}
        )
      })
    })

    res.send({ result: 'ok' })
  })


  app.get('/api/v1/mintTranslations/', async (req, res) => {

    let result = {}
    let languages = await Language.model
      .find()
      .where('isEnable', true)
      .exec()

    if (!languages) {
      res.status(400).send({error: 'no languages found'})
    }

    let languagesArray = []
    languages.map((e) => {
      result[e.key] = {}
      languagesArray.push(e.key)
    })

    const translation = await MintTranslation.model
      .find()
      .where({ i18nTranslations: { $ne: '' }, isActive: { $eq: true }  })
      .exec()

    if (!translation) {
      res.status(400).send({error: 'no translations found'})
    }

    translation.forEach((transValue, transKey) => {
        if (transValue.i18n) {
          for (const [language, value] of Object.entries(transValue.i18n)) {
            if (value && value.active && languagesArray.includes(language)) {
              if (typeof result[language] !== 'object') {
                result[language] = {}
              }
              _.set(result[language], transValue.path, value['overrides']['value'])
            }
          }
        }
    })

    res.send(result)
  })


  app.get('/api/v1/languages', async (req, res) => {
    const languages = await Language.model
      .find()
      .where('isEnable', true)
      .exec()
    res.send({languages})
  })

  app.get('/api/v1/titles', async (req, res) => {
    const titles = await Title.model
      .find()
      .exec()
    res.send({titles})
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
    const persisted = await Enquiry.model.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      enquiryType: 'message',
      message: body.message
    })

    const { subject, content } = notifyAboutEnquiry(persisted)
    const message = new Message({
      to: config.get('mail.infoAddress'),
      subject,
      html: content
    })
    await message.send()

    res.send(persisted)
  })

  app.post('/api/v1/subscriptions', async (req, res) => {
    const body = req.body
    const persisted = await Subscription.model.create({
      email: body.email
    })
    res.send(persisted)
  })

  app.post('/api/v1/applications', async (req, res) => {
    const body = req.body
    const persisted = await Application.model.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      job: body.job,
      message: body.message
    })
    res.send(persisted)
  })
  
  app.post('/api/v1/reports', async (req, res) => {
    const body = req.body
    const persisted = await Report.model.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message
    })
    res.send(persisted)
  })

  app.get('/api/v1/faq-topics', async (req, res) => {
    const topics = await FaqTopic.model
      .find()
      .sort(req.query.order || 'sortOrder')
      .populate({ path: 'questions', options: { sort: { sortOrder: 1 } } })
      .exec()
    res.send(topics.map(topic => ({
      ...topic.toJSON(),
      questions: [...topic.questions]
    })))
  })

  app.get('/api/v1/members', async (req, res) => {
    const members = await Member.model
      .find()
      .sort(req.query.order || 'sortOrder')
      .exec()
    res.send({
      members
    })
  })

  app.get('/api/v1/partners', async (req, res) => {
    const partners = await Partner.model
      .find()
      .sort(req.query.order || 'sortOrder')
      .exec()
    res.send({
      partners
    })
  })

  app.get('/api/v1/exchanges', async (req, res) => {
    const exchanges = await Exchange.model
      .find()
      .sort(req.query.order || 'sortOrder')
      .exec()
    res.send({
      exchanges
    })
  })

  app.get('/api/v1/menus', async (req, res) => {
    const menus = await Menu.model
      .find()
      .sort(req.query.order || 'sortOrder')
      .populate({ path: 'children', options: { sort: { sortOrder: 1 } } })
      .exec()
    res.send(menus.map(menu => ({
      ...menu.toJSON(),
      children: [...menu.children]
    })))
  })

  app.use('/api/v1/medium', medium)

  restful.expose({
    Article: {
      methods: ['list', 'retrieve']
    },
    Contact: {
      methods: ['list', 'retrieve']
    },
    Constant: {
      methods: ['list', 'retrieve']
    },
    Feature: {
      methods: ['list', 'retrieve']
    },
    Job: {
      methods: ['list', 'retrieve']
    },
    Language: {
      methods: ['list', 'retrieve']
    },
    Header: {
      methods: ['retrieve'],
    },
    Iteration: {
      methods: ['list', 'retrieve'],
    },
    Member: {
      methods: ['retrieve']
    },
    Menu: {
      methods: ['retrieve']
    },
    Paper: {
      methods: ['list', 'retrieve']
    },
    Partner: {
      methods: ['retrieve']
    },
    Post: {
      methods: ['list', 'retrieve'],
      populate: ['categories', 'author'],
    },
    Product: {
      methods: ['retrieve'],
      populate: ['downloads', 'distros', 'features'],
    },
    Social: {
      methods: ['list', 'retrieve']
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
