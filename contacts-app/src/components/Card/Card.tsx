import '@/assets/modules/Card.css'
import { IChildren, TContact, TFunction } from '@/types'
import { AnchorWrapper, AnimatedIcon } from '@/components'
import { IsEmpty } from '@/utils'

interface ICard extends IChildren, TContact {
	className?: string
	iconName?: string
	subText?: string
	onOpen?: TFunction<[id: string]>
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
	onOpen,
	toggleBookmark,
}: ICard) {
	const contactLogo = `${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`
	const isCardHeader = !className.includes('card-header')

	return (
		<div className={className}>
			<AnchorWrapper>
				<AnimatedIcon
					className="card-icon"
					animation={isCardHeader ? 'fa-beat-fade' : ''}
					onClick={() => (isCardHeader ? onOpen && onOpen(id) : null)}
				>
					{contactLogo.toUpperCase()}
				</AnimatedIcon>
			</AnchorWrapper>

			<div
				className="contact-card-details"
				onClick={() => (isCardHeader ? onOpen && onOpen(id) : null)}
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
					className={`card-bookmark ${isStarred && !IsEmpty(contactLogo) ? 'lit-bookmark' : ''}`}
					iconName={`fa-${
						isStarred && !IsEmpty(contactLogo) ? 'solid enabled' : 'regular disabled'
					} fa-bookmark`}
					animation={
						isStarred && !IsEmpty(contactLogo) ? 'fa-bounce' : !IsEmpty(contactLogo) ? 'pulse' : ''
					}
					onClick={() => toggleBookmark(id)}
				/>
			</AnchorWrapper>

			{onOpen && (
				<a
					className="menu descend"
					onClick={() => {
						onOpen(id)
					}}
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
