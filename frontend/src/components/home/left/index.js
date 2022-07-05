import LeftLink from './LeftLink'
import './style.css'
import { left } from '../../../data/home'
import { Link } from 'react-router-dom'
import { ArrowDown } from '../../../svg'
import { useState } from 'react'
export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className='left_home scrollbar'>
      <Link to='/profile'>
        <div className='left_link hover1'>
          <img src={user?.picture} alt=''></img>
          <span>
            {user?.first_name} {user?.last_name}
          </span>
        </div>
      </Link>

      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link?.img}
          text={link?.text}
          notifications={link?.notification}
        ></LeftLink>
      ))}
      {!visible && (
        <div
          className='left_link hover1'
          onClick={() => {
            setVisible(true)
          }}
        >
          <div className='small_circle'>
            <ArrowDown></ArrowDown>
          </div>
          <span>See More</span>
        </div>
      )}
      {visible && (
        <div>
          {' '}
          <div className='more_left'>
            {left.slice(8, left.length).map((link, i) => (
              <LeftLink
                key={i}
                img={link?.img}
                text={link?.text}
                notifications={link?.notification}
              ></LeftLink>
            ))}
          </div>
          <div
            className='left_link hover1'
            onClick={() => {
              setVisible(false)
            }}
          >
            <div className='small_circle rotate360'>
              <ArrowDown></ArrowDown>
            </div>
            <span>Show Less</span>
          </div>
        </div>
      )}
      <div className='splitter'></div>
      <div className='shortcut'>
        <div className='heading'>Your Shortcuts</div>
        <div className='edit_shortcut'>Edit</div>
      </div>
      <div className='shortcut_list'></div>
    </div>
  )
}
