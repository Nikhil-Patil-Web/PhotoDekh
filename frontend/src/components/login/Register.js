import { Formik, Form } from 'formik'
import { useState } from 'react'
import RegisterInput from '../inputs/registerinputs'
import * as Yup from 'yup'

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
                <div className='reg_grid'>
                  <select
                    name='bDay'
                    value={bDay}
                    onChange={handleRegisterChange}
                  >
                    {days.map((day, i) => (
                      <option value={day} key={i}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name='bMonth'
                    value={bMonth}
                    onChange={handleRegisterChange}
                  >
                    {months.map((month, i) => (
                      <option value={month} key={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name='bYear'
                    value={bYear}
                    onChange={handleRegisterChange}
                  >
                    {years.map((year, i) => (
                      <option value={year} key={i}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Gender <i className='info_icon'></i>
                </div>
                <div className='reg_grid'>
                  <label htmlFor='male'>
                    Male
                    <input
                      type='radio'
                      name='gender'
                      id='male'
                      value='male'
                      onChange={handleRegisterChange}
                    ></input>
                  </label>
                  <label htmlFor='female'>
                    Female
                    <input
                      type='radio'
                      name='gender'
                      id='female'
                      value='female'
                      onChange={handleRegisterChange}
                    ></input>
                  </label>
                  <label htmlFor='custom'>
                    Custom
                    <input
                      type='radio'
                      name='gender'
                      id='custom'
                      value='custom'
                      onChange={handleRegisterChange}
                    ></input>
                  </label>
                </div>
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
