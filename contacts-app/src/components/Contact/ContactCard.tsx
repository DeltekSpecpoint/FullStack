import { Card } from '@/components'
import { TContact } from '@/types'
import { IsEmpty, TimeAgo } from '@/utils'
import { ComponentProps } from 'react'

interface IContactCard
	extends TContact,
		Pick<ComponentProps<typeof Card>, 'onOpen' | 'toggleBookmark'> {}

export function ContactCard({ id, ...props }: IContactCard) {
	const subText = IsEmpty(id)
		? '( Card Preview )'
		: `Last Modified ${TimeAgo(new Date(props.modified))}`
	return (
		<Card
			id={id}
			className="contact-item card-header"
			subText={subText}
			{...props}
		/>
	)
}
