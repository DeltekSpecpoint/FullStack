import { AxiosError } from 'axios'

type TContactsError = Error & {
	code: number
	unknownError?: unknown
}
export function CreateError(error: unknown) {
	let result: TContactsError = {
		code: -1,
		name: 'An error has occurred.',
		message: 'An unknown error occurred.',
		unknownError: error, // attach original error as unknownError prop
	}

	if (error instanceof AxiosError) {
		// received error response range: (5xx, 4xx)
		if (error.response) {
			const { status, statusText, data } = error.response
			return {
				code: status,
				name: error.name,
				message: data.message ? data.message : data || statusText,
				unknownError: error.response,
			}
		}
		// never received response / request never left
		else if (error.request) {
			return {
				...result,
				name: 'Network Error',
				message: "Cloud server didn't respond.",
			}
		}
		// anything else AxiosError
		throw new Error('Something went wrong...')
	} else if (error instanceof Error) {
		// error is an instance of Error
		result.message = error.message

		if (typeof error === 'object' && error !== null) {
			// error is an object cast to interface with a name, message or code properties
			const unknownError = error as TContactsError
			if (unknownError) {
				const { code, name, message } = unknownError
				result = {
					code: code ? code : result.code,
					name: name ? name : result.name,
					message: message ? message : result.message,
					unknownError: error,
				}
			}
		}
	}

	return result
}

export function TimeAgo(date: Date): string {
	const now = new Date()
	const seconds = Math.round((now.getTime() - date.getTime()) / 1000)
	const minutes = Math.round(seconds / 60)
	const hours = Math.round(minutes / 60)
	const days = Math.round(hours / 24)

	if (seconds < 60) {
		return 'a moment ago'
	} else if (minutes < 60) {
		return `${minutes} minutes ago`
	} else if (hours < 24) {
		return `${hours} hours ago`
	} else if (days < 7) {
		return `${days} days ago`
	} else {
		return date.toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		})
	}
}

export function IsEmpty<T>(value: T) {
	const isEmptyObject = (obj: object) => {
		const noObjKeys = Object.keys(obj).length === 0
		const emptyPropValues = !Object.values(obj).some(item => {
			if (typeof item === 'boolean') return true
			return Boolean(item)
		})
		return noObjKeys || emptyPropValues
	}

	switch (typeof value) {
		case 'undefined':
			return true
		case 'string':
			return value.trim().length <= 0
		case 'object':
			return isEmptyObject(value as object)
		case 'boolean':
			return value
		default: {
			if (Array.isArray(value)) {
				const noContent = value.length <= 0
				const emptyArrObj = value.every(obj => isEmptyObject(obj))
				return noContent || emptyArrObj
			}
		}
	}
}
