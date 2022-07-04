import './style.css'

import LoginForm from '../../components/login/LoginForm'
import Footer from '../../components/login/Footer'
import Register from '../../components/login/Register'
import { useState } from 'react'

export default function Login() {
  const [visible, setVisible] = useState(false)
  return (
    <div className='login'>
      <div className='login_wrapper'>
        <LoginForm setVisible={setVisible}></LoginForm>
        {visible && <Register setVisible={setVisible}></Register>}
        <Footer></Footer>
      </div>
    </div>
  )
}
