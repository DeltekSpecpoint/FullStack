import '@/assets/modules/ContactCard.css'
import { IChildren, TContact, TFunction } from '@/types'
import { AnchorWrapper, AnimatedIcon } from '@/components'

interface IContactCard extends IChildren, TContact {
	className?: string
	iconName?: string
	onOpen: TFunction<string>
	onBookMark: TFunction<string>
}

export function ContactCard({
	children,
	className = 'contact-item',
	iconName = 'fa fa-chevron-left',
	id,
	firstName,
	lastName,
	mobile,
	email,
	isStarred,
	onOpen,
	onBookMark,
}: IContactCard) {
	const contactLogo = `${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`

	return (
		<div className={className}>
			<AnchorWrapper>
				<AnimatedIcon
					className="card-icon"
					animation="fa-beat-fade"
					onClick={() => onOpen(id)}
				>
					{contactLogo.toUpperCase()}
				</AnimatedIcon>
			</AnchorWrapper>

			<div className="contact-card-details">
				{email ? (
					<AnchorWrapper href={`mailto:${email}`}>
						{firstName} {lastName}
					</AnchorWrapper>
				) : (
					<p className="regular enabled">
						{firstName} {lastName}
					</p>
				)}
				<p className="small">{email ? mobile : mobile}</p>
			</div>

			<AnchorWrapper>
				<AnimatedIcon
					iconName={`fa-${isStarred ? 'solid enabled' : 'regular disabled'} fa-bookmark`}
					animation="fa-beat-fade"
					onClick={() => onBookMark(id)}
				/>
			</AnchorWrapper>
			{onOpen && (
				<a
					className="menu descend"
					onClick={() => onOpen(id)}
				>
					<AnimatedIcon
						className="x-small"
						iconName={iconName}
					/>
				</a>
			)}
			{children}
		</div>
	)
}
