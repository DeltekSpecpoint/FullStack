export const validate = (formData) => {
  const newErrors = {}

  // Name field validation
  if (!formData.name || formData.name.trim() === '') {
    newErrors.name = 'Name is required'
  }

  // Phone Number field validation
  if (!formData.phoneNumber) {
    newErrors.phoneNumber = 'Phone Number is required'
  } else if (!/^\d+$/.test(formData.phoneNumber)) {
    newErrors.phoneNumber = 'Phone Number must be a valid number'
  }

  // Email field validation
  if (!formData.email || formData.email.trim() === '') {
    newErrors.email = 'Email is required'
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
  ) {
    newErrors.email = 'Invalid email address'
  }

  return newErrors
}
