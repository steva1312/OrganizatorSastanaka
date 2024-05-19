import React, { useState } from "react"
import { Field, Formik, Form, ErrorMessage } from 'formik'
import axios from '../../api/axios'
import { useBuy } from "../../context/BuyContext"

function Register() {
  const { nextStep, userData, setUserData } = useBuy()

  const formInitialValues = userData

  const onFormSubmit = async data => {
    setUserData(data)
    nextStep()
  }

  const validateForm = async (values) => {
    const errors = {}

    if (!values.email) errors.email = 'This field is required'
    if (!values.fullName) errors.fullName = 'This field is required'
    if (!values.password) errors.password = 'This field is required'
    if (!values.confirmPassword) errors.confirmPassword = 'This field is required'

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email adress'
    }

    const response = await axios.post('/auth/email', { email: values.email })
    if (!response.data.available) errors.email = 'This email is already registered'

    if (values.password.length < 6) errors.password = 'Password must be minimum 6 characters long'

    if (values.password != values.confirmPassword) errors.confirmPassword = 'Passwords don\'t match'

    return errors
  }

  return (
    <div className="flex-col items-center mt-6 max-sm:mt-4">

      <Formik
        initialValues={formInitialValues}
        onSubmit={onFormSubmit}
        validate={validateForm}
      >
        <Form className='flex flex-col w-[350px] max-sm:w-[80vw]'>
          <div className='flex flex-col'>
            <label className='mb-2 text-2xl max-sm:text-lg'>Email:</label>
            <Field
              name='email'
              placeholder='Your email...'
              className='border-2 py-2 px-3 text-xl max-sm:text-lg rounded-sm border-gray-300'
            />
            <ErrorMessage name="email" component='span' className='mt-1 text-red-600'/>
          </div>

          <div className='mt-6 max-sm:mt-4 flex flex-col'>
            <label className='mb-2 text-2xl max-sm:text-lg'>Full name:</label>
            <Field
              name='fullName'
              placeholder='Your full name...'
              className='border-2 py-2 px-3 text-xl max-sm:text-lg rounded-sm border-gray-300'
            />
            <ErrorMessage name="fullName" component='span' className='mt-1 text-red-600' />
          </div>
          
          <div className='mt-6 max-sm:mt-4 flex flex-col'>
            <label className='mb-2 text-2xl max-sm:text-lg'>Password:</label>
            <Field
              name='password'
              placeholder='Password...'
              className='border-2 py-2 px-3 text-xl max-sm:text-lg rounded-sm border-gray-300'
            />
            <ErrorMessage name="password" component='span' className='mt-1 text-red-600' />
          </div>
          
          <div className='mt-6 max-sm:mt-4 flex flex-col'>
            <label className='mb-2 text-2xl max-sm:text-lg'>Confirm password:</label>
            <Field
              name='confirmPassword'
              placeholder='Confirm password...'
              className='border-2 py-2 px-3 text-xl max-sm:text-lg rounded-sm border-gray-300'
            />
            <ErrorMessage name="confirmPassword" component='span' className='mt-1 text-red-600' />
          </div>

          <button className='mt-10 max-sm:mt-6 bg-secondary text-white text-2xl max-sm:text-xl py-2' type="submit">Next</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Register