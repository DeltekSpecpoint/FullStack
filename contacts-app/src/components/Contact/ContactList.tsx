import { IChildren, TContact, TFunction, TModalActions, TStatus } from '@/types'
import { CardListContainer, Header, SearchBar } from '@/components'
import ContactForm from './ContactForm'

interface IContactContainer extends IChildren {
	contacts: TContact[]
	currentContact: TContact
	mutateCurrentContact: TFunction<TContact>
	toggleBookmark: TFunction<[id: string]>
	modalActions: TModalActions
	contactsCount: number
	status: TStatus
	searchCallback: TFunction<[searchKey?: string], number>
}

export function ContactList({
	children,
	contacts,
	contactsCount,
	currentContact,
	mutateCurrentContact,
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
						<p className="x-small disabled scale-up">Contacts you have added will appear here.</p>
					) : (
						<Header.Status status={status} />
					)}
				</Header>
			)}

			{currentContact.id ? (
				<ContactForm
					{...{
						modalActions,
						currentContact,
						toggleBookmark,
						mutateCurrentContact,
					}}
				/>
			) : (
				<>
					{contactsCount > 0 && <SearchBar searchCallback={searchCallback} />}
					<CardListContainer
						contacts={contacts}
						actionHandler={{
							toggleBookmark,
							handleClick: modalActions.open,
						}}
					/>
				</>
			)}

			{children}
		</section>
	)
}
