import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import LogInInput from '../../components/inputs/logininputs'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'

export default function SearchAccount({
  email,
  setEmail,
  error,
  setError,
  setLoading,
  setUserInfos,
  setVisible,
}) {
  const handleSearch = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post('http://localhost:8000/findUser', {
        email,
      })
      setUserInfos(data)
      setVisible(1)
      setError('')
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
    }
  }

  const validateEmail = Yup.object({
    email: Yup.string()
      .required('Email address is required')
      .email('Must be a valid email address')
      .max(50, 'Email address cannot be more than 50 characters'),
  })
  return (
    <div className='reset_form'>
      <div className='reset_form_header'>Find Your Account</div>
      <div className='reset_form_text'>
        Please enter your email address or mobile number to search for your
        account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={validateEmail}
        onSubmit={() => {
          handleSearch()
        }}
      >
        {(formik) => (
          <Form>
            <LogInInput
              type='text'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email Address or Phone Number'
            />
            {error && <div className='error_text'>{error}</div>}
            <div className='reset_btns'>
              <Link to='/login' className='gray_btn'>
                Cancel
              </Link>
              <button type='submit' className='blue_btn'>
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
