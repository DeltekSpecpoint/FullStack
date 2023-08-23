import { Card } from '@/components'
import { TContact } from '@/types'
import { TimeAgo } from '@/utils'
import { ComponentProps } from 'react'

interface IContactCard
	extends TContact,
		Pick<ComponentProps<typeof Card>, 'onOpen' | 'onBookMark'> {}

export function ContactCard({ id, ...props }: IContactCard) {
	return (
		<Card
			id={id}
			className="contact-item card-header"
			subText={`Last Modified ${TimeAgo(new Date(props.modified))}`}
			{...props}
		/>
	)
}
