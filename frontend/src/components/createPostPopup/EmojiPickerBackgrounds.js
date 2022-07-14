import Picker from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'

export default function EmojiPickerBackgrounds({ text, setText, user }) {
  const [picker, setPicker] = useState(false)
  const [cursorPointer, setCursorPointer] = useState()
  const textRef = useRef(null)

  useEffect(() => {
    textRef.current.selectionEnd = cursorPointer
  }, [cursorPointer])

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current
    ref.focus()
    const start = text.substring(0, ref.selectionStart)
    const end = text.substring(ref.selectionStart)
    const newText = start + emoji + end
    setText(newText)
    setCursorPointer(start.length + emoji.length)
  }
  return (
    <>
      <div className='flex_center'>
        <textarea
          ref={textRef}
          maxLength='100'
          value={text}
          placeholder={`What's on your mind ${user.first_name} ?`}
          onChange={(e) => setText(e.target.value)}
          className='post_input'
        ></textarea>
      </div>
      <div className='post_emojis_wrap'>
        {picker && (
          <div className='comment_emoji_picker rlmove'>
            <Picker onEmojiClick={handleEmoji}></Picker>
          </div>
        )}
        <img src='../../../icons/colorful.png' alt=''></img>
        <i
          className='emoji_icon_large'
          onClick={() => {
            setPicker((prev) => !prev)
          }}
        ></i>
      </div>
    </>
  )
}
