import EmojiPickerBackgrounds from './EmojiPickerBackgrounds'

export default function ImagePreview({ text, setText, user }) {
  return (
    <div className='overflow_a'>
      <EmojiPickerBackgrounds
        text={text}
        user={user}
        setText={setText}
        type2
      ></EmojiPickerBackgrounds>
    </div>
  )
}
