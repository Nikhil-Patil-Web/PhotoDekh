import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../../components/createPost'
import Header from '../../components/header'
import LeftHome from '../../components/home/left'
import RightHome from '../../components/home/right'
import Stories from '../../components/home/stories'
import useClickOutside from '../../helpers/clickOutside'
import ActivateForm from './ActivateForm'
import axios from 'axios'
import Cookies from 'js-cookie'
import './style.css'

export default function Activate() {
  const [visible, setVisible] = useState(true)
  const { user } = useSelector((user) => ({ ...user }))
  const el = useRef(null)
  useClickOutside(el, () => {
    setVisible(false)
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { token } = useParams()

  useEffect(() => {
    activateAccount()
  }, [])

  const activateAccount = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        'http://localhost:8000/activate',
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      setSuccess(data.message)
      Cookies.set('user', JSON.stringify({ ...user, verified: true }))
      dispatch({ type: 'VERIFY', payload: true })
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (error) {
      console.log(error.response.data)
      {
        error.response.data.message && setError(error.response.data.message)
      }
      {
        error.response.data.error && setError(error.response.data.error)
      }
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }

  return (
    <div className='home'>
      {success && (
        <ActivateForm
          type='success'
          header='Account verification succeeded'
          text={success}
          loading={loading}
        ></ActivateForm>
      )}
      {error && (
        <ActivateForm
          type='error'
          header='Account verification failed'
          text={error}
          loading={loading}
        ></ActivateForm>
      )}
      <Header></Header>
      <LeftHome user={user}></LeftHome>
      <div className='home_middle'>
        <Stories></Stories>
        <CreatePost user={user}></CreatePost>
      </div>
      <RightHome user={user}></RightHome>
    </div>
  )
}
