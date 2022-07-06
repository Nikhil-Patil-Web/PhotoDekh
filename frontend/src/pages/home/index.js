import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/header'
import LeftHome from '../../components/home/left'
import RightHome from '../../components/home/right'
import useClickOutside from '../../helpers/clickOutside'

export default function Home() {
  const [visible, setVisible] = useState(true)
  const { user } = useSelector((user) => ({ ...user }))
  const el = useRef(null)
  useClickOutside(el, () => {
    setVisible(false)
  })
  return (
    <div>
      <Header></Header>
      <LeftHome user={user}></LeftHome>
      <RightHome user={user}></RightHome>
    </div>
  )
}
