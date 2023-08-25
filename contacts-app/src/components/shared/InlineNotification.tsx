import type { IChildren } from '@/types'
import { AnimatedIcon } from '@/components'

interface IInlineNotification extends IChildren {
	iconName?: string
	className?: string
	offsetYPos?: string
}
export function InlineNotification({
	children,
	iconName,
	className,
	offsetYPos = '79%',
}: IInlineNotification) {
	return (
		<div
			className="clipboard-status"
			style={{ top: offsetYPos }}
		>
			<p className="center x-small descend">
				<AnimatedIcon
					className={className}
					iconName={`${iconName ? iconName : 'fa fa-info-circle'}`}
					animation="fa-beat-fade"
					animateOnLoad
				/>
				{children}
			</p>
		</div>
	)
}
