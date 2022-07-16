import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Picker from 'emoji-picker-react'
import './style.css'
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds'
import AddToYourPost from './AddToYourPost'
import ImagePreview from './ImagePreview'

export default function CreatePostPopup({ user }) {
  const [text, setText] = useState('')
  const [userDetails, setUserDetails] = useState(true)
  const [showPrev, setShowPrev] = useState(true)
  const [images, setImages] = useState([])

  if (userDetails) {
    return (
      <div className='blur'>
        <div className='postBox'>
          <div className='box_header'>
            <div className='small_circle'>
              <i className='exit_icon'></i>
            </div>
            <span>Create Post</span>
          </div>
          <div className='box_profile'>
            <img src={user?.picture} alt='' className='box_profile_img'></img>
            <div className='box_col'>
              <div className='box_profile_name'>
                {user?.first_name}
                {user?.last_name}
              </div>
              <div className='box_privacy'>
                <img src='../../../icons/public.png' alt=''></img>
                <span>Public</span>
                <i className='arrowDown_icon'></i>
              </div>
            </div>
          </div>
          {!showPrev ? (
            <>
              <EmojiPickerBackgrounds
                text={text}
                setText={setText}
                user={user}
              ></EmojiPickerBackgrounds>
            </>
          ) : (
            <ImagePreview
              text={text}
              setText={setText}
              user={user}
              images={images}
              setImages={setImages}
              setShowPrev={setShowPrev}
            ></ImagePreview>
          )}
          <AddToYourPost setShowPrev={setShowPrev}></AddToYourPost>
          <button className='post_submit'>Post</button>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
