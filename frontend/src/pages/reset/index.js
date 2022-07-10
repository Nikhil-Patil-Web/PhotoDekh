import './style.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import SearchAccount from './SearchAccount'
import SearchEmail from './SearchEmail'
import CodeVerify from './CodeVerify'
import Footer from '../../components/login/Footer'
import ChangePassword from './ChangePassword'
export default function Reset() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(3)
  const [password, setPassword] = useState('')
  const [conf_password, setConf_password] = useState('')
  const [code, setCode] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logout = () => {
    Cookies.set('user', '')
    dispatch({
      type: 'LOGOUT',
    })
    navigate('/login')
  }

  const { user } = useSelector((state) => ({ ...state }))
  return (
    <div className='reset'>
      <div className='reset_header'>
        <img src='../../../icons/facebook.svg' alt=''></img>
        {user ? (
          <div className='right_reset'>
            <Link to='/profile'>
              <img src={user.picture} alt=''></img>
            </Link>
            <button className='blue_btn' onClick={() => logout()}>
              Logout
            </button>
          </div>
        ) : (
          <Link to='/login' className='right_reset'>
            <button className='blue_btn'>Login</button>
          </Link>
        )}
      </div>
      <div className='reset_wrap'>
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
          ></SearchAccount>
        )}
        {visible === 1 && <SearchEmail user={user}></SearchEmail>}
        {visible === 2 && (
          <CodeVerify
            user={user}
            code={code}
            setCode={setCode}
            error={error}
          ></CodeVerify>
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            conf_password={conf_password}
            setPassword={setPassword}
            setConf_password={setConf_password}
          ></ChangePassword>
        )}
      </div>
      <Footer></Footer>
    </div>
  )
}
