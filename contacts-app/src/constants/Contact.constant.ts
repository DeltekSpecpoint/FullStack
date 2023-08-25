import { TContact, TStatus } from '@/types'

export const CONTACT_CONST = {
	STATUS: {
		success: false,
		message: '',
	},
	INIT_CONTACT: {
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
	INIT_CONTACT: TContact
	STATUS: TStatus
}
