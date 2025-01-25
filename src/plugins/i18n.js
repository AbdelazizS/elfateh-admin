import { createI18n, I18nN } from 'vue-i18n'
import en from '../locales/en.json' // <--- add this
import ar from '../locales/ar.json' // <--- add this
// import i18n from '@/i18n'

const messages = {
  en,
  ar
}

const languages = Object.getOwnPropertyNames(messages)

export function checkDefaultLanguage() {
  let matched = null
  // biome-ignore lint/complexity/noForEach: <explanation>
  languages.forEach((language) => {
    if (language === navigator.language) {
      matched = language
    }
  })
  if (!matched) {
    // biome-ignore lint/complexity/noForEach: <explanation>
    languages.forEach((language) => {
      if (language === navigator.language.split('-')[0]) {
        matched = language
      }
    })
  }
  if (!matched) {
    // biome-ignore lint/complexity/noForEach: <explanation>
    languages.forEach((language) => {
      if (language.split('-')[0] === navigator.language.split('-')[0]) {
        matched = language
      }
    })
  }
  return matched
}

export function getBrowserLocale(options = {}) {
  const defaultOptions = { countryCodeOnly: false }

  const opt = { ...defaultOptions, ...options }

  const navigatorLocale =
    navigator.languages !== undefined ? navigator.languages[0] : navigator.language

  if (!navigatorLocale) {
    return undefined
  }

  const trimmedLocale = opt.countryCodeOnly
    ? navigatorLocale.trim().split(/-|_/)[0]
    : navigatorLocale.trim()

  return trimmedLocale
}

export default createI18n({
  locale: localStorage.getItem('language') || checkDefaultLanguage(), // <--- 1
  fallbackLocale: 'ar', // <--- 2
  legacy: false, // <--- 3,
  globalInjection: true, // <--- add this
  availableLocales: ['ar', 'en'],
  messages
})

export const setLocale = (locale) => {
  // window.location.reload()
  localStorage.setItem('language', locale)
  // i18n.global.locale.value = locale
}
