export default function DisplayAccess({ setVisible }) {
  return (
    <div className='absolute_wrap'>
      <div className='absolute_wrap_header'>
        <div className='circle hover3'>
          <i
            className='arrow_back_icon'
            onClick={() => {
              setVisible(0)
            }}
          ></i>
        </div>
        Display and Accessibility
      </div>
      <div className='menu_main'>
        <div className='small_circle' style={{ width: '50px' }}>
          <i className='dark_filled_icon'></i>
        </div>
        <div className='menu_col'>
          <span className='menu_span1'>Dark Mode</span>
          <span className='menu_span2'>
            Adjust the appearnace of Facebook to reduce glare and give your eyes
            a break
          </span>
        </div>
      </div>
      <label htmlFor='darkOn' className='hover1'>
        <span>On</span>
        <input type='radio' name='dark' id='darkOn'></input>
      </label>
      <label htmlFor='darkOff' className='hover1'>
        <span>Off</span>
        <input type='radio' name='dark' id='darkOff'></input>
      </label>

      <div className='menu_main'>
        <div className='small_circle' style={{ width: '50px' }}>
          <i className='compact_icon'></i>
        </div>
        <div className='menu_col'>
          <span className='menu_span1'>Compact Mode</span>
          <span className='menu_span2'>
            Make your font-size smaller so that more content can fit on your
            screen.
          </span>
        </div>
      </div>
      <label htmlFor='compactOn' className='hover1'>
        <span>On</span>
        <input type='radio' name='compact' id='compactOn'></input>
      </label>
      <label htmlFor='compactOff' className='hover1'>
        <span>Off</span>
        <input type='radio' name='compact' id='compactOff'></input>
      </label>
      <div className='menu_item hover3'>
        <div className='small_circle'>
          <i className='keyboard_icon'></i>
        </div>
        <span>Keyboard</span>
        <div className='rArrow'>
          <i className='right_icon'></i>
        </div>
      </div>
    </div>
  )
}
