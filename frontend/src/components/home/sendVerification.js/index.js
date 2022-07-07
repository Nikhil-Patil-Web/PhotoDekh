import { useState } from 'react'
import './style.css'
import axios from 'axios'
export default function SendVerification({ user }) {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const sendVerificationEmail = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/sendVerification',
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      setSuccess(data.message)
    } catch (error) {
      {
        error.resposne.data.error && setError(error.resposne.data.error)
      }
      {
        error.resposne.data.message && setError(error.resposne.data.message)
      }
    }
  }

  return (
    <div className='send_verification'>
      <span>
        Your account is not verified, verify your account before it gets deleted
        in 30 days of creation.
      </span>
      <a
        onClick={() => {
          sendVerificationEmail()
        }}
      >
        click here to resend verification link
      </a>
      {success && <div className='success_text'>{success}</div>}
      {error && <div className='success_text'>{error}</div>}
    </div>
  )
}
