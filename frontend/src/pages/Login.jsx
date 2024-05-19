import React, { useEffect, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { Field, Formik, Form, ErrorMessage } from 'formik'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [apiError, setApiError] = useState('')

  const { authorize } = useAuth()

  const formInitialValues = {
    email: "",
    password: "",
  }

  const onFormSubmit = async data => {
    const response = await axios.post('/auth/login', data)
    const { error, accessToken } = response.data

    if (error) {
      setApiError(error)
      return
    }

    localStorage.setItem('accessToken', accessToken)

    authorize()
  }

  const validateForm = (values) => {
    const errors = {}

    if (!values.email) errors.email = 'This field is required'
    if (!values.password) errors.password = 'This field is required'

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email adress'
    }
    
    return errors
  }

  return (
    <div className="flex flex-col items-center place-content-center pt-[13vh]">
      <header className="absolute top-0 z-50 w-full flex px-12 max-md:px-5 h-[8vh] place-content-between items-center bg-primary text-xl font-extralight">
      <Link className="h-8 max-md:h-[40%]" to='/'>
        <img className="h-full" src="/img/logo.png" />
      </Link>

        <Link className='text-xl font-extralight text-white' to='/'>HOME</Link>
      </header>

      <h1 className='text-6xl max-sm:text-4xl mb-10 max-sm:mb-5'>Sign In</h1>

      <Formik
        initialValues={formInitialValues}
        onSubmit={onFormSubmit}
        validate={validateForm}
      >
        <Form className='flex flex-col'>
          <div className='flex flex-col'>
            <label className='mb-2 text-2xl max-sm:text-lg'>Email:</label>
            <Field
              name='email'
              placeholder='Your email...'
              className='border-2 py-2 px-3 text-xl max-sm:text-lg rounded-sm border-gray-300'
            />
            <ErrorMessage name="email" component='span'  className='mt-1 text-red-600'/>
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

          <button type="submit" className='mt-10 max-sm:mt-6 bg-secondary text-white text-2xl max-sm:text-xl py-2'>Submit</button>
        </Form>
      </Formik>

      <p className='mt-2 text-red-600 text-lg max-sm:text-base'>{apiError}</p>
    </div>
  )
}

export default Login
