import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function usePersistForm({ formValues }) {
  const location = useLocation();
  const [event, updateEvent] = React.useReducer((prev, next) => {
    var retVal = { ...prev, ...next}

    localStorage.setItem(location.pathname, JSON.stringify(retVal))

    return { ...prev, ...next }
  }, { ...formValues })

  useEffect(() => {
    const cache = localStorage.getItem(location.pathname)
    if (cache) {
      updateEvent(JSON.parse(cache))
    }
  }, [])

  const onChange = (field, value) => {
    updateEvent({ [field]: value } )
  }

  const handleSubmit = (formSubmitHandler) => {
    return (e) => {
      e.preventDefault()

      // validations

      formSubmitHandler(event)

      // delete from localstorage
      localStorage.removeItem(location.pathname)
    }
  }

  return {
    handleSubmit,
    onChange, values: event
  }
}

export default usePersistForm