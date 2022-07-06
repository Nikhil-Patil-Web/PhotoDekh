import { Dots, NewRoom, Search } from '../../../svg'
import Contact from './Contact'
import './style.css'
export default function RightHome({ user }) {
  const color = '#65676b'
  return (
    <div className='right_home'>
      <div className='heading'>Sponsored</div>
      <div className='splitter1'></div>
      <div className='contacts_wrap'>
        <div className='contacts_header'>
          <div className='contacts_header_left'>Contacts</div>
          <div className='contacts_header_right'>
            <div className='contact_circle'>
              <NewRoom color={color}></NewRoom>
            </div>
            <div className='contact_circle'>
              <Search color={color}></Search>
            </div>
            <div className='contact_circle'>
              <Dots color={color}></Dots>
            </div>
          </div>
        </div>
        <div className='contacts_list'>
          <Contact user={user}></Contact>
        </div>
      </div>
    </div>
  )
}
