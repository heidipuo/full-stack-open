import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    console.log('value', value)
    setValue('')
  }

  return {
    inputs: { 
      type,
      value,
      onChange
    }, 
    onReset
  }
}