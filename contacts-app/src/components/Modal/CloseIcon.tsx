import { AnimatedIcon } from '@/components'
import { ComponentProps } from 'react'

export function CloseIcon({
	className = '',
	iconName = '',
	onClick = () => null,
}: Pick<ComponentProps<typeof AnimatedIcon>, 'className' | 'iconName' | 'onClick'>) {
	return (
		<a
			className={`modal-close ${className}`}
			onClick={onClick}
		>
			<AnimatedIcon
				animation="spins"
				iconName={`${iconName ? iconName : 'fa fa-close'}`}
			/>
		</a>
	)
}
