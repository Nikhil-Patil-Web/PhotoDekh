import { Feeling, LiveVideo, Photo } from '../../svg'
import './style.css'
export default function CreatePost({ user }) {
  return (
    <div className='createPost'>
      <div className='createPost_header'>
        <img src={user?.picture} alt=''></img>
        <div className='open_post hover3'>
          What's on your mind? {user?.first_name}
        </div>
      </div>
      <div className='create_splitter'></div>
      <div className='createPost_body'>
        <div className='createPost_icon hover1'>
          <LiveVideo color='#f3425f'></LiveVideo>
          Live Video
        </div>
        <div className='createPost_icon hover1'>
          <Photo color='#4bbf67'></Photo>
          Photo/Video
        </div>
        <div className='createPost_icon hover1'>
          <Feeling color='#f7b928'></Feeling>
          Feeling/Activity
        </div>
      </div>
    </div>
  )
}
