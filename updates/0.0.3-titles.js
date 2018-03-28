/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
  Title: [{
    "slug": "what-is-chronobank-io",
    "sortOrder": 1,
    "i18nTranslations": "cn, ru, de, es",
    "stereotype": "h2",
    "title": "What is ChronoBank.io?",
    "subtitle": "ChronoBank.io is an ambitious and wide-ranging blockchain project, aimed at disrupting the HR/recruitment/finance industries in a similar way to how Uber disrupted the taxi business and how Upwork represented an evolution in freelancing.",
    "name": "What is ChronoBank.io?",
    "i18n": {
      "cn": {
        "active": true,
        "overrides": {
          "title": "ChronoBank.io是什么？",
          "subtitle": "ChronoBank.io是一个宏伟的、规模宽广的区块链项目。本项目旨在以类似的方式打乱人力资源/就业/财务行业，就跟Uber打乱出租车业务以及Upwork代表自由职业的发展一样。"
        }
      },
      "ru": {
        "active": true,
        "overrides": {
          "title": "Что такое ChronoBank.io?",
          "subtitle": "ChronoBank.io – блокчейн-проект с большим размахом и масштабными целями, который ставит себе цель изменить индустрию HR/рекрутинга/финансов в такой же степени, как Uber изменил индустрию такси, а Upwork – фриланс."
        }
      },
      "de": {
        "active": true,
        "overrides": {
          "title": "Was ist ChronoBank.io?",
          "subtitle": "ChronoBank.io ist ein ambitioniertes und weitläufiges Blockchain Projekt das darauf abzielt, die HR/Anwerbungs-/Finanz- Industrie auf gleiche Weise zu verändern wie Uber das Taxi Business revolutioniert und Upwork eine Entwicklung im Freelancing gebracht hat."
        }
      },
      "es": {
        "active": true,
        "overrides": {
          "title": "¿Qué es ChronoBank.io?",
          "subtitle": "ChronoBank.io es un ambicioso proyecto de amplio alcance que apunta a modificar las industrias de recursos humanos/reclutamiento/finanzas de una manera similar en la que Uber modificó el negocio de los taxis y en la que Upwork representó una evolución en el freelancing."
        }
      }
    }
  }, {
    "slug": "contact-us",
    "sortOrder": 3,
    "i18nTranslations": "cn, ru, de, es",
    "stereotype": "h3",
    "title": "Contact us",
    "name": "Contact us",
    "i18n": {
      "cn": {"active": true, "overrides": {"title": "联系我们"}},
      "ru": {"active": true, "overrides": {"title": "Контакты"}},
      "de": {"active": true, "overrides": {"title": "Kontaktieren Sie uns"}},
      "es": {"active": true, "overrides": {"title": "Contáctanos"}}
    },
  }, {
    "slug": "get-in-touch-with-our-team",
    "sortOrder": 4,
    "i18nTranslations": "cn, ru, de, es",
    "stereotype": "h4",
    "title": "Get in touch with our team",
    "name": "Get in touch with our team",
    "i18n": {
      "cn": {"active": true, "overrides": {"title": "联系我们的团队"}},
      "ru": {"active": true, "overrides": {"title": "Связаться с командой"}},
      "de": {"active": true, "overrides": {"title": "Treten Sie mit unserem Team in Verbindung"}},
      "es": {"active": true, "overrides": {"title": "Ponte en contacto con nuestro equipo"}}
    },
  }, {
    "slug": "latest-news",
    "sortOrder": 5,
    "i18nTranslations": "cn, ru, de, es",
    "stereotype": "h2",
    "title": "Latest news",
    "name": "Latest news",
    "i18n": {
      "cn": {"active": true, "overrides": {"title": "最新新闻"}},
      "ru": {"active": true, "overrides": {"title": "Новости"}},
      "de": {"active": true, "overrides": {"title": "Latest News"}},
      "es": {"active": true, "overrides": {"title": "Últimas Noticias "}}
    },
  }, {
    "slug": "press",
    "sortOrder": 6,
    "i18nTranslations": "cn, ru, de, es",
    "stereotype": "h2",
    "title": "Press",
    "name": "Press",
    "i18n": {
      "cn": {"active": true, "overrides": {"title": "刊物"}},
      "ru": {"active": true, "overrides": {"title": "О нас в СМИ"}},
      "de": {"active": true, "overrides": {"title": "Presse"}},
      "es": {"active": true, "overrides": {"title": "Prensa"}}
    },
  }, {
    "slug": "partners",
    "sortOrder": 8,
    "i18nTranslations": "cn, ru, de, es",
    "stereotype": "h2",
    "title": "Partners",
    "subtitle": "We are proud of our partners",
    "name": "Partners",
    "i18n": {
      "cn": {"active": true, "overrides": {"title": "合作伙伴", "subtitle": "我们以我们的合作伙伴自豪"}},
      "ru": {"active": true, "overrides": {"title": "Партнеры", "subtitle": "Мы гордимся своими партнерами"}},
      "de": {"active": true, "overrides": {"title": "Partner", "subtitle": "Wir sind stolz auf unsere Partner"}},
      "es": {"active": true, "overrides": {"title": "Socios", "subtitle": "Estamos orgullosos de nuestros socios"}}
    }
  }, {
    "slug": "roadmap",
    "sortOrder": 9,
    "i18nTranslations": "cn, ru, de, es",
    "stereotype": "h2",
    "title": "Roadmap",
    "name": "Roadmap",
    "i18n": {
      "cn": {"active": true, "overrides": {"title": "路线图"}},
      "ru": {"active": true, "overrides": {"title": "Roadmap"}},
      "de": {"active": true, "overrides": {"title": "Roadmap"}},
      "es": {"active": true, "overrides": {"title": "Plan de ruta"}}
    },
  }, {
    "slug": "labour-hour-features",
    "sortOrder": 10,
    "i18nTranslations": "ru, de, es",
    "stereotype": "h3",
    "title": "Labour–Hour Features",
    "name": "Labour–Hour Features",
    "i18n": {
      "ru": {"active": true, "overrides": {"title": "Особенности Labour–Hour"}},
      "de": {"active": true, "overrides": {"title": "Labour–Hour Features"}},
      "es": {"active": true, "overrides": {"title": "Característica de los Labour-Hour"}}
    },
  }, {
    "slug": "contact-us-1",
    "sortOrder": 11,
    "i18nTranslations": "cn, ru, de, es",
    "stereotype": "h3",
    "title": "Contact us",
    "name": "Contact us",
    "i18n": {
      "cn": {"active": true, "overrides": {"title": "联系我们"}},
      "ru": {"active": true, "overrides": {"title": "Контакты"}},
      "de": {"active": true, "overrides": {"title": "Kontaktiere uns"}},
      "es": {"active": true, "overrides": {"title": "Contáctanos"}}
    },
  }, {
    "slug": "chronobank-is",
    "sortOrder": 12,
    "i18nTranslations": "ru, de, es",
    "stereotype": "h2",
    "title": "ChronoBank is",
    "name": "ChronoBank is",
    "i18n": {
      "ru": {"active": true, "overrides": {"title": "ChronoBank это"}},
      "de": {"active": true, "overrides": {"title": "ChronoBank ist"}},
      "es": {"active": true, "overrides": {"title": "ChronoBank es"}}
    },
  }, {
    "slug": "jobs-at-chronobank-io",
    "sortOrder": 13,
    "i18nTranslations": "cn, ru, de, es",
    "stereotype": "h2",
    "title": "Jobs at Chronobank.io",
    "name": "Jobs at Chronobank.io",
    "i18n": {
      "cn": {"active": true, "overrides": {"title": "在Chronobank.io工作"}},
      "ru": {"active": true, "overrides": {"title": "Вакансии в Chronobank.io"}},
      "de": {"active": true, "overrides": {"title": "Jobs bei Chronobank.io "}},
      "es": {"active": true, "overrides": {"title": "Empleos en Chronobank.io "}}
    },
  }, {
    "slug": "key-features",
    "sortOrder": 14,
    "i18nTranslations": "cn, ru, de, es",
    "stereotype": "h3",
    "title": "Key features",
    "name": "Key features",
    "i18n": {
      "cn": {"active": true, "overrides": {"title": "主要特征"}},
      "ru": {"active": true, "overrides": {"title": "Главные особенности"}},
      "de": {"active": true, "overrides": {"title": "Haupteigenschaften"}},
      "es": {"active": true, "overrides": {"title": "Características principales"}}
    },
  }, {
    "slug": "chronomint-downloads",
    "sortOrder": 15,
    "i18nTranslations": "ru, de, es",
    "title": "ChronoMint downloads",
    "stereotype": "h2",
    "name": "ChronoMint downloads",
    "i18n": {
      "ru": {"active": true, "overrides": {"title": "Загрузить ChronoMint "}},
      "de": {"active": true, "overrides": {"title": "ChronoMint Downloads"}},
      "es": {"active": true, "overrides": {"title": "Descargas ChronoMint"}}
    },
  }, {
    "slug": "your-application-has-been-submitted",
    "sortOrder": 16,
    "i18nTranslations": "ru, de, es",
    "stereotype": "h2",
    "name": "Your application has been submitted",
    "i18n": {
      "ru": {"active": true, "overrides": {"title": "Ваша заявка была успешно отправлена"}},
      "de": {"active": true, "overrides": {"title": "Ihre Bewerbung wurde entgegengenommen"}},
      "es": {"active": true, "overrides": {"title": "Tu solicitud ha sido enviada"}}
    },
    "title": "Your application has been submitted",
  }, {
    "stereotype": "h2",
    "name": "Your message has been sent",
    "title": "Your message has been sent",
  }]
}
