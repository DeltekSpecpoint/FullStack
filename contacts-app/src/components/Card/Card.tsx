import '@/assets/modules/Card.css'
import { IChildren, TContact, TFunction } from '@/types'
import { AnchorWrapper, AnimatedIcon } from '@/components'
import { IsEmpty } from '@/utils'

interface ICard extends IChildren, TContact {
	className?: string
	iconName?: string
	subText?: string
	handleClick?: TFunction<[id: string]>
	toggleBookmark: TFunction<[id: string]>
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
	handleClick,
	toggleBookmark,
}: ICard) {
	const contactLogo = `${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`
	// to disable/enable click handler when it's used as card-header
	const isCardHeader = !className.includes('card-header')

	return (
		<div className={className}>
			<AnchorWrapper>
				<AnimatedIcon
					className="card-icon"
					animation={isCardHeader ? 'fa-beat-fade' : ''}
					onClick={() => (isCardHeader ? handleClick && handleClick(id) : null)}
				>
					{contactLogo.toUpperCase()}
				</AnimatedIcon>
			</AnchorWrapper>

			<div
				className="contact-card-details"
				onClick={() => (isCardHeader ? handleClick && handleClick(id) : null)}
			>
				{email && isCardHeader ? (
					<AnchorWrapper href={`mailto:${email}`}>
						{firstName} {lastName}
					</AnchorWrapper>
				) : (
					<p className="regular enabled">
						{firstName} {lastName}
					</p>
				)}
				<p className="small disabled">{subText ? subText : email ? mobile : mobile}</p>
			</div>

			<AnchorWrapper>
				<AnimatedIcon
					title="Bookmark"
					className={`card-bookmark ${isStarred && !IsEmpty(contactLogo) ? 'lit-bookmark' : ''}`}
					iconName={`fa-${isStarred && !IsEmpty(contactLogo) ? 'solid enabled' : 'regular disabled'
						} fa-bookmark`}
					animation={
						isStarred && !IsEmpty(contactLogo) ? 'fa-bounce' : !IsEmpty(contactLogo) ? 'pulse' : ''
					}
					onClick={() => toggleBookmark(id)}
				/>
			</AnchorWrapper>

			{handleClick && (
				<a
					className={`menu action-button small active scale-down`}
					onClick={() => handleClick(id)}
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
