import { TContact, TStatus } from '@/types'

export const CONTACT_CONST = {
	RESET_STATUS: {
		success: false,
		message: '',
	},
	EMPTY_CONTACT: {
		id: '',
		firstName: '',
		lastName: '',
		mobile: '',
		email: '',
		address: '',
		isStarred: false,
		modified: new Date(),
	},
} satisfies {
	EMPTY_CONTACT: TContact
	RESET_STATUS: TStatus
}
