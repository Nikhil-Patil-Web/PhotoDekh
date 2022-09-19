import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Picker from 'emoji-picker-react'
import './style.css'
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds'
import AddToYourPost from './AddToYourPost'
import ImagePreview from './ImagePreview'
import useClickOutside from '../../helpers/clickOutside'
import { createPost } from '../../functions/post'
import PulseLoader from 'react-spinners/PulseLoader'
import PostError from './PostError'
import dataURItoBlob from '../../helpers/dataURItoBlob'
import { uploadImages } from '../../functions/uploadImages'

export default function CreatePostPopup({ user, setVisible }) {
  const popup = useRef(null)
  const [text, setText] = useState('')
  const [userDetails, setUserDetails] = useState(true)
  const [showPrev, setShowPrev] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [images, setImages] = useState([])
  const [background, setBackground] = useState('')
  useClickOutside(popup, () => {
    setVisible(false)
  })

  const postSubmit = async () => {
    if (background) {
      setLoading(true)
      const response = await createPost(
        null,
        background,
        text,
        null,
        user?.id,
        user?.token
      )
      setLoading(false)
      if (response === 'ok') {
        setBackground('')
        setText('')
        setVisible(false)
      } else {
        setError(response)
      }
    } else if (images && images.length) {
      setLoading(true)
      console.log('here in images function')
      const postImages = images.map((img) => {
        return dataURItoBlob(img)
      })
      const path = `${user.username}/post Images`
      let formData = new FormData()
      formData.append('path', path)
      postImages.forEach((image) => {
        formData.append('file', image)
      })
      const response = await uploadImages(formData, path, user?.token)

      const res = await createPost(text, response, user?.id, user?.token)
      setLoading(false)
      if (res === 'ok') {
        setText('')
        setImages('')
        setVisible(false)
      } else {
        setError(res)
      }
    } else if (text) {
      setLoading(true)
      const response = await createPost(
        null,
        background,
        text,
        null,
        user?.id,
        user?.token
      )
      if (response === 'ok') {
        setBackground('')
        setText('')
        setVisible(false)
      } else {
        setError(response)
      }
    } else {
      console.log('Nothing')
    }
  }

  if (userDetails) {
    return (
      <div className='blur'>
        <div className='postBox' ref={popup}>
          {error && <PostError error={error} setError={setError}></PostError>}
          <div className='box_header'>
            <div className='small_circle'>
              <i
                className='exit_icon'
                onClick={() => {
                  setVisible(false)
                }}
              ></i>
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
                setBackground={setBackground}
                background={background}
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
              setError={setError}
              error={error}
            ></ImagePreview>
          )}
          <AddToYourPost setShowPrev={setShowPrev}></AddToYourPost>
          <button
            className='post_submit'
            onClick={() => {
              postSubmit()
            }}
            disabled={loading}
          >
            {loading ? (
              <PulseLoader color='#fff' size={5}></PulseLoader>
            ) : (
              'Post'
            )}
          </button>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
