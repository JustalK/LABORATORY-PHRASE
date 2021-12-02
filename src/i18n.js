import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import PhraseInContextEditorPostProcessor from 'i18next-phrase-in-context-editor-post-processor'
import translationFr from '@src/locales/fr/translation.json'
import translationDe from '@src/locales/en/translation.json'

const resources = {
  en: {
    translation: translationFr
  },
  fr: {
    translation: translationDe
  }
}

i18n
  .use(initReactI18next)
  .use(
    new PhraseInContextEditorPostProcessor({
      phraseEnabled: true,
      projectId: 'b65412bf163e1226b106a63612d48493'
    })
  )
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    },
    postProcess: ['phraseInContextEditor']
  })

export default i18n
