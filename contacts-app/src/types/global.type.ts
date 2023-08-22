export type TStatus = {
	success: boolean
	message: string
}

export type TContact = {
	id: string
	firstName: string
	lastName: string
	mobile: string
	email: string
	address: string
	isStarred: boolean
	modified: Date
}
