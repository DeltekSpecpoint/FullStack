import { ComponentProps } from 'react'
import { TContact } from '@/types'
import { Card } from '@/components/Card'
import { IsEmpty } from '@/utils'

interface IContactCardContainer {
	actionHandler: Pick<ComponentProps<typeof Card>, 'onOpen' | 'onBookMark'>
	contacts: TContact[]
}

export function CardListContainer({ contacts, actionHandler }: IContactCardContainer) {
	if (IsEmpty(contacts)) return null

	return (
		<div className="contact-list">
			{contacts.map(({ id, ...props }) => (
				<Card
					id={id}
					key={id}
					iconName="fa fa-chevron-right"
					onOpen={actionHandler.onOpen}
					onBookMark={actionHandler.onBookMark}
					{...props}
				/>
			))}
		</div>
	)
}
