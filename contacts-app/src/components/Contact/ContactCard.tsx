import { Card } from '@/components'
import { IChildren, TContact } from '@/types'
import { IsEmpty, TimeAgo } from '@/utils'
import { ComponentProps } from 'react'

interface IContactCard
	extends IChildren,
		TContact,
		Pick<ComponentProps<typeof Card>, 'handleClick' | 'toggleBookmark'> {}

export function ContactCard(props: IContactCard) {
	return (
		<Card
			className="contact-item card-header"
			subText={
				IsEmpty(props.id)
					? '( Card Preview )'
					: `Last Modified ${TimeAgo(new Date(props.modified))}`
			}
			{...props}
		>
			{props.children}
		</Card>
	)
}
