import { ComponentProps } from 'react'
import { TContact } from '@/types'
import { Card } from '@/components'
import { IsEmpty } from '@/utils'

interface IContactCardContainer {
	actionHandler: Pick<ComponentProps<typeof Card>, 'handleClick' | 'toggleBookmark'>
	contacts: TContact[]
}

export function CardListContainer({ contacts, actionHandler }: IContactCardContainer) {
	if (IsEmpty(contacts)) return null

	return (
		<div className="contact-list">
			{contacts.map(props => (
				<Card
					key={props.id}
					iconName="fa fa-chevron-right"
					{...actionHandler}
					{...props}
				/>
			))}
		</div>
	)
}
