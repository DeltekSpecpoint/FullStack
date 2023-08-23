import '@/assets/modules/Card.css'
import { IChildren, TContact, TFunction } from '@/types'
import { AnchorWrapper, AnimatedIcon } from '@/components'

interface ICard extends IChildren, TContact {
	className?: string
	iconName?: string
	subText?: string
	onOpen: TFunction<[id: string]>
	onBookMark: TFunction<[id: string]>
}

export function Card({
	children,
	className = 'contact-item',
	iconName = 'fa fa-chevron-left',
	id,
	firstName,
	lastName,
	mobile,
	email,
	isStarred,
	subText,
	onOpen,
	onBookMark,
}: ICard) {
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
				<p className="small">{subText ? subText : email ? mobile : mobile}</p>
			</div>

			<AnchorWrapper>
				<AnimatedIcon
					className={`card-bookmark ${isStarred ? 'lit-bookmark' : ''}`}
					iconName={`fa-${isStarred ? 'solid enabled' : 'regular disabled'} fa-bookmark`}
					animation={isStarred ? 'fa-bounce' : 'pulse'}
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
