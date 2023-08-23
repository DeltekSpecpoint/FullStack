import { TContact, TFunction } from '@/types'
import { ContactCard } from '@/components/ContactCard'

type TCardActionHandler = {
	bookMark: TFunction<[id: string]>
	openCard: TFunction<[id: string]>
}
interface IContactCardContainer {
	actionHandler: TCardActionHandler
	contacts: TContact[]
}

export function ContactCardContainer({ contacts, actionHandler }: IContactCardContainer) {
	return (
		<div className="contact-list">
			{contacts.map(({ id, ...props }, idx) => (
				<ContactCard
					id={id}
					key={`${id}${idx}}`}
					iconName="fa fa-chevron-right"
					onOpen={actionHandler.openCard}
					onBookMark={actionHandler.bookMark}
					{...props}
				/>
			))}
		</div>
	)
}
