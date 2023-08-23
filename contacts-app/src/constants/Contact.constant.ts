import { TContact } from '@/types'

export const CONTACT_CONST = {
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
}
