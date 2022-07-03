import { Formik, Form } from 'formik'
import { useState } from 'react'
import RegisterInput from '../inputs/registerinputs'
import * as Yup from 'yup'
import DateOfBirthSelect from './DateOfBirthSelect'
import GenderSelect from './GenderSelect'

export default function Register() {
  const userInfos = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  }
  const tempYear = new Date().getFullYear()
  const [user, setUser] = useState(userInfos)
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user
  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const years = Array.from(new Array(108), (val, index) => tempYear - index)

  const months = Array.from(new Array(12), (val, index) => 1 + index)
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate()
  }
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index)
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required('What is your First Name?')
      .min(2, 'First Name must be between 2 and 20 characters')
      .max(20, 'First Name must be between 2 and 20 characters')
      .matches(
        /^[aA-zZ]+$/,
        'Numbers, Special Characters and Spaces are not allowed.'
      ),
    last_name: Yup.string()
      .required('What is your Last Name?')
      .min(2, 'Last Name must be between 2 and 20 characters')
      .max(20, 'Last Name must be between 2 and 20 characters')
      .matches(
        /^[aA-zZ]+$/,
        'Numbers, Special Characters and Spaces are not allowed.'
      ),
    email: Yup.string()
      .required(
        "You'll Need this when you Login and If You ever Want to Reset Your Password"
      )
      .email('Enter a valid email address'),
    password: Yup.string()
      .required(
        'Enter a combination of atleast six, numbers letters and punctuation marks(such as ! and &'
      )
      .min(6, 'Password needs to have atleast 6 characters')
      .max(36, 'Password can a the max have 36 characters'),
  })

  const [dateError, setDateError] = useState('')
  const [genderError, setGenderError] = useState('')

  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i className='exit_icon'></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date()
            let picked_date = new Date(bYear, bMonth - 1, bDay)
            let atleast14 = new Date(1970 + 14, 0, 1)
            let noMoreThan70 = new Date(1970 + 70, 0, 1)
            if (current_date - picked_date < atleast14) {
              setDateError(
                "It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              )
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                "It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              )
            } else if (gender === '') {
              setDateError('')
              setGenderError(
                'Please select a gender. You can change who will see this later'
              )
            } else {
              setDateError('')
              setGenderError('')
            }
          }}
        >
          {(formik) => (
            <Form className='register_form'>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='First Name'
                  name='first_name'
                  onChange={handleRegisterChange}
                ></RegisterInput>
                <RegisterInput
                  type='text'
                  placeholder='Surname'
                  name='last_name'
                  onChange={handleRegisterChange}
                ></RegisterInput>
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='Mobile Number or Email Address'
                  name='email'
                  onChange={handleRegisterChange}
                ></RegisterInput>
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='password'
                  placeholder='New Password'
                  name='password'
                  onChange={handleRegisterChange}
                ></RegisterInput>
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Date Of Birth <i className='info_icon'></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                ></DateOfBirthSelect>
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Gender <i className='info_icon'></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                ></GenderSelect>
              </div>
              <div className='reg_infos'>
                By clicking you are agreeing to our{' '}
                <span>Terms, Data Policy &nbsp;</span>and
                <span>Cookie Policy</span>
                You may recieve SMS notifications from us and can opt out any
                time.
              </div>
              <div className='reg_btn_wrapper'>
                <button className='blue_btn open_signup'>Sign Up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
