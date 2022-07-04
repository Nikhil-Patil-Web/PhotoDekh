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
export default function Header() {
  const { user } = useSelector((user) => ({ ...user }))
  const color = '#65676b'
  return (
    <header>
      <div className='header_left'>
        <Link to='/' className='header_logo'>
          <div className='circle'>
            <Logo></Logo>
          </div>
        </Link>
        <div className='search search1'>
          <Search color={color}></Search>
          <input
            type='text'
            placeholder='Search facebook'
            className='hide_input'
          ></input>
        </div>
      </div>
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
        <div className='circle_icon hover1'>
          <Menu />
        </div>
        <div className='circle_icon hover1'>
          <Messenger />
        </div>
        <div className='circle_icon hover1'>
          <Notifications />
          <div className='right_notification'>5</div>
        </div>
        <div className='circle_icon hover1'>
          <ArrowDown />
        </div>
      </div>
    </header>
  )
}
