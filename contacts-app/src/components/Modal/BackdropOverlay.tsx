import type { IChildren, TFunction } from "@/types"

interface IBackdropOverlay extends IChildren {
	className?: string
	onClick?: TFunction
}
export function BackdropOverlay({
	children,
	className,
	onClick = () => null,
}: IBackdropOverlay) {
	return (
		<div
			className={`modal-overlay ${className}`}
			onClick={() => onClick()}>
			{children}
		</div>
	)
}
