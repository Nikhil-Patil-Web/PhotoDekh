import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CreatePost from '../../components/createPost'
import Header from '../../components/header'
import LeftHome from '../../components/home/left'
import RightHome from '../../components/home/right'
import SendVerification from '../../components/home/sendVerification.js'
import Stories from '../../components/home/stories'
import useClickOutside from '../../helpers/clickOutside'
import './style.css'

export default function Home() {
  const [visible, setVisible] = useState(true)
  const { user } = useSelector((user) => ({ ...user }))
  const el = useRef(null)
  useClickOutside(el, () => {
    setVisible(false)
  })

  return (
    <div className='home'>
      <Header></Header>
      <LeftHome user={user}></LeftHome>
      <div className='home_middle'>
        <Stories></Stories>
        {user.verified === false && (
          <SendVerification user={user}></SendVerification>
        )}
        <CreatePost user={user}></CreatePost>
      </div>
      <RightHome user={user}></RightHome>
    </div>
  )
}
