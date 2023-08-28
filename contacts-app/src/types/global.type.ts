import { TFunction } from '@/types'

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

export type TModalActions = {
	open: TFunction<[id?: string, isUpdate?: boolean]>
	close: TFunction
	commitChanges: TFunction<[contact: TContact]>
	sync: TFunction<[], Promise<void>>
	remove: TFunction<[id: string]>
}

export type TFormActions = 'Add' | 'Edit' | 'Open'
