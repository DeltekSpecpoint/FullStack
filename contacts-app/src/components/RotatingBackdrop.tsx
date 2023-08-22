import '@/assets/modules/RotatingBackdrop.css'

export function RotatingBackdrop() {
	return (
		<div className="background">
			<div
				data-testid="shape"
				className="shape lg"
			></div>
			<div
				data-testid="shape"
				className="shape lg"
			></div>
		</div>
	)
}
