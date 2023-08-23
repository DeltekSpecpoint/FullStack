import { ComponentProps } from 'react'
import { TContact } from '@/types'
import { Card } from '@/components/Card'

interface IContactCardContainer {
	actionHandler: Pick<ComponentProps<typeof Card>, 'onOpen' | 'onBookMark'>
	contacts: TContact[]
}

export function CardListContainer({ contacts, actionHandler }: IContactCardContainer) {
	return (
		<div className="contact-list">
			{contacts.map(({ id, ...props }) => (
				<Card
					id={id}
					key={`${id}`}
					iconName="fa fa-chevron-right"
					onOpen={actionHandler.onOpen}
					onBookMark={actionHandler.onBookMark}
					{...props}
				/>
			))}
		</div>
	)
}
