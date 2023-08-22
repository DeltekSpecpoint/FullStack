import type { IChildren } from "@/types"
import { AnimatedIcon } from "@/components"

export function Logo({ children }: IChildren) {
	return (
		<h1 className="scale-up">
			{children ? (
				children
			) : (
				<>
					<AnimatedIcon
						className="fade-in"
						iconName="fa fa-regular fa-address-card"
					/>
				</>
			)}
		</h1>
	)
}
