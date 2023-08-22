import { useState } from "react"
import type { IChildren, TFunction } from "@/types"

interface IAnimatedIcon extends IChildren {
	className: string
	iconName: string
	title: string
	onClick: TFunction
	animateOnLoad: boolean
	animation:
	| "fa-shake"
	| "fa-spin"
	| "fa-beat-fade"
	| "spinner"
	| "pulse"
	| "scale-up"
	| "scale-down"
	| "fade-in"
	| "spins"
	| "descend"
	| (string & { animation?: string })

}
export function AnimatedIcon({
	children,
	className = "",
	iconName = "",
	title = "",
	animation = "",
	animateOnLoad = false,
	onClick,
}: Partial<IAnimatedIcon>) {
	const [hover, setHover] = useState(false)

	const disabled = className.includes("disabled")

	return (
		<i
			title={title}
			className={`${className} ${iconName} ${animateOnLoad || hover ? animation : ""
				}`}
			onClick={onClick}
			onMouseOver={() => !disabled && setHover(true)}
			onMouseLeave={() => setHover(false)}>
			{children}
		</i>
	)
}
