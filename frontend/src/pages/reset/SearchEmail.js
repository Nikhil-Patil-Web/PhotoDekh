import axios from 'axios'
import { Link } from 'react-router-dom'

export default function SearchEmail({
  userInfos,
  error,
  loading,
  email,
  setError,
  setLoading,
  setUserInfos,
  setVisible,
}) {
  const sendEmail = async () => {
    try {
      setLoading(true)
      await axios.post('http://localhost:8000/sendResetPasswordCode', { email })
      setError('')
      setVisible(2)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
    }
  }
  return (
    <div className='reset_form dynamic_height'>
      <div className='reset_form_header'>Reset Your Password</div>
      <div className='reset_grid'>
        <div className='reset_left'>
          <div className='reset_form_text'>
            How do you want to recieve the code to reset your pasword?
          </div>
          <label htmlFor='email' className='hover1'>
            <input type='radio' name='' id='email' checked readOnly></input>
            <div className='label_col'>
              <span>Send code via email</span>
              <span>{userInfos.email}</span>
            </div>
          </label>
        </div>
        <div className='reset_right'>
          <img src={userInfos.picture} alt=''></img>
          <span>{userInfos.email}</span>
          <span>Facebook User</span>
        </div>
      </div>
      {error && (
        <div className='error_text' style={{ padding: '10px' }}>
          {error}
        </div>
      )}
      <div className='reset_btns'>
        <Link to='/login' className='gray_btn'>
          Not You?
        </Link>
        <button
          onClick={() => {
            sendEmail()
          }}
          className='blue_btn'
        >
          Continue
        </button>
      </div>
    </div>
  )
}
