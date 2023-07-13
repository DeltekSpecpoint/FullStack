export function contactValidationError(errors) {
    return {
      type: "CONTACT_VALIDATION_ERROR",
      errors
    }
  }