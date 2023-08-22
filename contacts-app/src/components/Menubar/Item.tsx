import { AnimatedIcon } from "@/components"
import type { TFunction } from "@/types"

interface IMenuItem {
	onClick: TFunction
	name: string
	iconName: string
	animation: string
}
export function Item({
	name,
	onClick,
	iconName = "fa fa-bars",
	animation = "",
}: Partial<IMenuItem>) {
	return (
		<a
			title={name}
			className="button-style menu descend"
			onClick={onClick}>
			<AnimatedIcon
				title={name}
				className={iconName}
				iconName={iconName}
				animation={animation}
			/>
		</a>
	)
}
