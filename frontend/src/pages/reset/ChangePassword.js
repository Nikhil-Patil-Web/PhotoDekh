import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import LogInInput from '../../components/inputs/logininputs'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

export default function ChangePassword({
  password,
  conf_password,
  setPassword,
  setConf_password,
  error,
}) {
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        'Enter a combination of atleast 6 numbers, letters and symbols.'
      )
      .min(6, 'Password must contain atleast 6 characters')
      .max(36, 'Password must contain no more than 36 characters'),
    conf_password: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  })

  return (
    <div className='reset_form' style={{ height: '320px' }}>
      <div className='reset_form_header'>Change Password</div>
      <div className='reset_form_text'>Please enter your new password.</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          conf_password,
        }}
        validationSchema={validatePassword}
      >
        {(formik) => (
          <Form>
            <LogInInput
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='New Password'
            />
            <LogInInput
              type='password'
              name='conf_password'
              onChange={(e) => setConf_password(e.target.value)}
              placeholder='Confirm New Password'
              bottom
            />
            {error && <div className='error_text'>{error}</div>}
            <div className='reset_btns'>
              <Link to='/login' className='gray_btn'>
                Cancel
              </Link>
              <button type='submit' className='blue_btn'>
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
