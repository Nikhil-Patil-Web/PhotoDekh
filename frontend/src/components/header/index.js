import { Link } from 'react-router-dom'
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from '../../svg'
import './style.css'
import { useSelector } from 'react-redux'
import SearchMenu from './SearchMenu'
import { useRef, useState } from 'react'
import AllMenu from './AllMenu'
import useClickOutside from '../../helpers/clickOutside'
import UserMenu from './userMenu'
export default function Header() {
  const { user } = useSelector((user) => ({ ...user }))
  const color = '#65676b'
  const [showSearchMenu, setShowSearchMenu] = useState(false)
  const [showAllMenu, setShowAllMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const allmenu = useRef(null)
  const usermenu = useRef(null)
  useClickOutside(allmenu, () => {
    setShowAllMenu(false)
  })

  useClickOutside(usermenu, () => {
    setShowUserMenu(false)
  })

  return (
    <header>
      <div className='header_left'>
        <Link to='/' className='header_logo'>
          <div className='circle'>
            <Logo></Logo>
          </div>
        </Link>
        <div
          className='search search1'
          onClick={() => {
            setShowSearchMenu(true)
          }}
        >
          <Search color={color}></Search>
          <input
            type='text'
            placeholder='Search facebook'
            className='hide_input'
          ></input>
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu
          color={color}
          setShowSearchMenu={setShowSearchMenu}
        ></SearchMenu>
      )}
      <div className='header_middle'>
        <Link to='/' className='middle_icon active'>
          <HomeActive />
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Friends />
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Watch />
          <div className='middle_notification'>9+</div>
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Market />
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Gaming />
        </Link>
      </div>
      <div className='header_right'>
        <Link to='/profile' className='profile_link hover1'>
          <img src={user?.picture} alt='' />
          <span> {user?.first_name}</span>
        </Link>
        <div
          className={
            showAllMenu ? 'circle_icon active_header' : 'circle_icon hover1'
          }
          ref={allmenu}
        >
          <div
            onClick={
              !showAllMenu
                ? () => {
                    setShowAllMenu(true)
                  }
                : () => {
                    setShowAllMenu(false)
                  }
            }
          >
            <Menu />
          </div>
          {showAllMenu && <AllMenu></AllMenu>}
        </div>
        <div className='circle_icon hover1'>
          <Messenger />
        </div>
        <div className='circle_icon hover1'>
          <Notifications />
          <div className='right_notification'>5</div>
        </div>
        <div
          className={
            showUserMenu ? 'circle_icon active_header' : 'circle_icon hover1'
          }
          ref={usermenu}
        >
          <div
            onClick={
              !showUserMenu
                ? () => {
                    setShowUserMenu(true)
                  }
                : () => {
                    setShowUserMenu(false)
                  }
            }
          >
            <ArrowDown />
          </div>
          {showUserMenu && <UserMenu user={user}></UserMenu>}
        </div>
      </div>
    </header>
  )
}
