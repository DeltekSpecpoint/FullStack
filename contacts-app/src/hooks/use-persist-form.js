import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function usePersistForm({ formValues }) {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false)
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
      var savedValues = JSON.parse(cache)
      var hasChanges = false;

      // check if there are really changes in the form
      for (const key in savedValues) {
        if (savedValues[key]) {
          if ((!formValues[key] && savedValues[key])
            || (savedValues[key] !== formValues[key])){
            hasChanges = true
            break
          } else {
            // delete the saved session if all are the same
            localStorage.removeItem(location.pathname)
          }
        }
      }

      if (hasChanges) {
        updateEvent(savedValues)
        setLoaded(true)
      }
    }
  }, [location])

  const inputValidations = { }

  const addRequiredValidation = (name, required) => {
    inputValidations[name] = (value) => {
      if (!value) {
        const message = typeof required === 'string'
          ? required
          : `${name} is required`
        updateErrors({ [name]: { message }})
        return true
      } else {
        updateErrors({ [name]: null})
        return false
      }
    }
  }

  const onChange = (field, value) => {
    updateEvent({ [field]: value } )
  }

  const handleSubmit = (formSubmitHandler) => {
    return (e) => {
      e.preventDefault()
      let errorCount = 0

      // validations
      // we only implemented required validation here but we could implement more
      Object.keys(inputValidations).forEach(name => {
        if (inputValidations[name](event[name])) {
          errorCount++
        }
      })
      
      if (errorCount > 0) return

      // submit the form if all are valid 
      formSubmitHandler(event)

      // delete from localstorage
      localStorage.removeItem(location.pathname)
    }
  }

  const register = (name, validations) => {
    if (validations && validations.required) {
      addRequiredValidation(name, validations.required)
    }
    return {
      onChange: (e) => {
        if (inputValidations[name]) {
          inputValidations[name](e.target.value)
        }
        onChange(name, e.target.value)
      },
      value: event[name] ?? ""
    }
  }

  return {
    handleSubmit,
    register,
    errors,
    loaded
  }
}

export default usePersistForm