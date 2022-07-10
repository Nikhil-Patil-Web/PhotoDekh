import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import LogInInput from '../../components/inputs/logininputs'
import { Link } from 'react-router-dom'

export default function ChangePassword({
  password,
  conf_password,
  setPassword,
  setConf_password,
  error,
}) {
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
      >
        {(formik) => (
          <Form>
            <LogInInput
              type='text'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='New Password'
            />
            <LogInInput
              type='text'
              name='conf_password'
              onChange={(e) => setConf_password(e.target.value)}
              placeholder='Confirm New Password'
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
