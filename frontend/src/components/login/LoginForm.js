import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import LogInInput from '../../components/inputs/logininputs'
import { useState } from 'react'
import * as Yup from 'yup'

const loginInfos = {
  email: '',
  password: '',
}

export default function LoginForm() {
  const [login, setLogin] = useState(loginInfos)
  const { email, password } = login
  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLogin({ ...login, [name]: value })
  }
  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required')
      .email('Must be a valid email')
      .max(100),
    password: Yup.string().required('Password is a required field'),
  })

  return (
    <div className='login_wrap'>
      <div className='login_1'>
        <img src='../../icons/facebook.svg' alt='facebook logo'></img>
        <span>
          Facebook helps you connect and share with the people in your life
        </span>
      </div>
      <div className='login_2'>
        <div className='login_2_wrap'>
          <Formik
            enableReinitialize
            initialValues={{ email, password }}
            validationSchema={loginValidation}
          >
            {(formik) => (
              <Form>
                <LogInInput
                  type='text'
                  name='email'
                  placeholder='Email address or phone number'
                  onChange={handleLoginChange}
                ></LogInInput>
                <LogInInput
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={handleLoginChange}
                  bottom
                ></LogInInput>
                <button type='submit' className='blue_btn'>
                  Login
                </button>
              </Form>
            )}
          </Formik>

          <Link to='/forgot' className='forgot_password'>
            Forgotten Password
          </Link>
          <div className='sign_splitter'></div>
          <button className='blue_btn open_signup'>Create Account</button>
        </div>
        <Link to='/' className='sign_extra'>
          <b>Create a page</b> for a celebrity, brand, or business.
        </Link>
      </div>
    </div>
  )
}
