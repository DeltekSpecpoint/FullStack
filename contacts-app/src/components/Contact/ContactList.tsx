import { IChildren, TContact, TFunction, TModalActions, TStatus } from '@/types'
import { CardListContainer, Header, SearchBar } from '@/components'
import { IsEmpty } from '@/utils'
import ContactForm from './ContactForm'

interface IContactContainer extends IChildren {
	contacts: TContact[]
	openContact: TContact
	setOpenContact: TFunction<TContact>
	toggleBookmark: TFunction<[id: string]>
	modalActions: Partial<TModalActions>
	contactsCount: number
	status: TStatus
	searchCallback: TFunction<[searchKey?: string], number>
}
export function ContactList({
	children,
	contacts,
	contactsCount,
	openContact,
	setOpenContact,
	toggleBookmark,
	modalActions,
	status,
	searchCallback,
}: IContactContainer) {
	return (
		<section className="form-container">
			{contactsCount > 0 ? (
				<Header>
					<Header.Logo />
					<Header.Title title="Contacts" />
					<p className="small disabled scale-up">{`${contactsCount} saved Contacts.`}</p>
					<Header.Status status={status} />
				</Header>
			) : (
				<Header>
					<Header.Title
						title="No Contacts"
						subTitle='click "+" to create one'
					/>
					{status.success || !status.message ? (
						// eslint-disable-next-line react/no-unescaped-entities
						<p className="x-small disabled scale-up">Contacts you've added will appear here.</p>
					) : (
						<Header.Status status={status} />
					)}
				</Header>
			)}

			{!IsEmpty(openContact) ? (
				<ContactForm {...{ modalActions, openContact, setOpenContact, toggleBookmark }} />
			) : (
				<>
					{contactsCount > 0 && <SearchBar searchCallback={searchCallback} />}
					<CardListContainer
						contacts={contacts}
						actionHandler={{
							toggleBookmark,
							onOpen: modalActions.open,
						}}
					/>
				</>
			)}

			{children}
		</section>
	)
}
