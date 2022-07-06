import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/header'
import LeftHome from '../../components/home/left'
import RightHome from '../../components/home/right'
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
      </div>
      <RightHome user={user}></RightHome>
    </div>
  )
}
