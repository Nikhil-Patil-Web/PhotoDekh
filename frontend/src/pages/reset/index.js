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
  const [loading, setLoading] = useState(false)
  const [userInfos, setUserInfos] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(0)
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
  console.log(userInfos)
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
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          ></SearchAccount>
        )}
        {visible === 1 && userInfos && (
          <SearchEmail
            userInfos={userInfos}
            error={error}
            loading={loading}
            email={email}
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          ></SearchEmail>
        )}
        {visible === 2 && (
          <CodeVerify
            user={user}
            code={code}
            setCode={setCode}
            userInfos={userInfos}
            error={error}
            loading={loading}
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
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
