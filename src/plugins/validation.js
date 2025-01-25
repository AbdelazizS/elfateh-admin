import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'

import {
  required,
  min,
  max,
  regex,
  numeric,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  not_one_of as excluded,
  confirmed
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('numeric', numeric)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max_value', maxVal)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded)
    defineRule('confirmed', confirmed)
    defineRule('regex', regex)

    configure({
      generateMessage: (context) => {
        const messages = {
          required: `auth.required`,
          min: 'auth.too_short',
          numeric: 'auth.only_numbers',
          max: 'auth.too_long',
          alpha_spaces: 'auth.alpha_spaces',
          email: 'auth.email_error',
          regex: 'auth.strong_password',
          // min_value: `This field $context.fieldis too low.`,
          // max_value: `This field $context.fieldis too high.`,
          excluded: 'auth.This field is not allowed.',
          country_excluded: 'auth.We do not allow users from this location',
          confirmed: 'auth.passwordConf_err'
        }
        const message = messages[context.rule.name]
          ? messages[context.rule.name]
          : 'The field $context.field invalid'

          
        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: true,
      validateOnModelUpdate: true
    })
  }
}
