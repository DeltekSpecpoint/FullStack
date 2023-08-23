import { ComponentProps } from 'react'
import { AnimatedIcon } from '@/components'

interface IMenuItem extends Omit<ComponentProps<typeof AnimatedIcon>, 'children'> {}
export function Item({
	title,
	onClick,
	iconName = 'fa fa-bars',
	animation = '',
	animateOnLoad = false,
}: Partial<IMenuItem>) {
	return (
		<a
			className="button-style menu descend"
			{...{ title, onClick }}
		>
			<AnimatedIcon {...{ title, iconName, animation, animateOnLoad }} />
		</a>
	)
}
