import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import LogInInput from '../../components/inputs/logininputs'
import { Link } from 'react-router-dom'

export default function SearchAccount({ email, setEmail, error }) {
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
