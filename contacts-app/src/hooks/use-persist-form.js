import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function usePersistForm({ formValues }) {
  const location = useLocation();
  const [event, updateEvent] = React.useReducer((prev, next) => {
    var retVal = { ...prev, ...next}

    localStorage.setItem(location.pathname, JSON.stringify(retVal))

    return retVal
  }, { ...formValues })
  const [errors, updateErrors] = React.useReducer((prev, next) => {
    return { ...prev, ...next }
  }, {  })

  useEffect(() => {
    const cache = localStorage.getItem(location.pathname)
    if (cache) {
      updateEvent(JSON.parse(cache))
    }
  }, [location])

  const onChange = (field, value) => {
    updateEvent({ [field]: value } )
  }

  const handleSubmit = (formSubmitHandler) => {
    return (e) => {
      e.preventDefault()

      // validations

      // submit the form if all ok
      formSubmitHandler(event)

      // delete from localstorage
      localStorage.removeItem(location.pathname)
    }
  }

  const register = (name, validations) => {
    return {
      onChange: (e) => {
        console.log(e)
        if (validations && validations.required) {
          if (!e.target.value) {
            const message = typeof validations.required === 'string'
              ? validations.required
              : `${name} is required`
            updateErrors({ [name]: { message }})
          } else {
            updateErrors({ [name]: null})
          }
        }
        onChange(name, e.target.value)
      },
      value: event[name] ?? ""
    }
  }

  return {
    handleSubmit,
    register,
    errors
  }
}

export default usePersistForm