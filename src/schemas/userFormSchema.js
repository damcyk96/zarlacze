import * as yup from 'yup'

const userFormSchema = yup.object().shape({
  bundleName: yup
    .string()
    .required()
    .matches(/^[a-z]+_*[a-z]+$/, 'Must be in format text_text'),
  description: yup
    .string()
    .required()
    .min(4, 'Must be longer')
    .max(255, 'Must be shorten'),
})

export { userFormSchema }
