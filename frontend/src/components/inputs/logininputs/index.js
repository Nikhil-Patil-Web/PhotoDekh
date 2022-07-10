import { ErrorMessage, useField } from 'formik'
import './style.css'
import { useMediaQuery } from 'react-responsive'
export default function LogInInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props)
  const desktopView = useMediaQuery({ query: '(min-width:850px)' })
  const view1050 = useMediaQuery({ query: '(max-width:1050px)' })

  return (
    <div className='input_wrap'>
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView && view1050 && field.name === 'password'
              ? 'input_error password_error'
              : desktopView
              ? 'input_error input_error_desktop'
              : 'input_error'
          }
          style={{ transform: ' translateX(2px)' }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={desktopView ? 'error_arrow_left' : 'error_arrow_top'}
            ></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? 'input_error_border' : ''}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      ></input>
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView && view1050 && field.name === 'conf_password'
              ? 'input_error conf_password_error'
              : desktopView
              ? 'input_error input_error_desktop'
              : 'input_error'
          }
          style={{ transform: ' translateX(2px)' }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? 'error_arrow_left' : 'error_arrow_bottom'
              }
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className='error_icon'
          style={{ top: `${!bottom && !desktopView && '62%'}` }}
        ></i>
      )}
    </div>
  )
}
