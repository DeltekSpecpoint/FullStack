import { AnimatedIcon } from '../AnimatedIcon'

interface ISubmitButton
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled'> {
	variant?: 'primary' | 'cancel' | 'default'
	submitted?: boolean
	disabled?: boolean
	textStatus?: string
	iconName?: string
}

export function Button({
	children,
	className,
	variant = 'primary',
	submitted = false,
	disabled = false,
	textStatus = '',
	iconName = '',
	...rest
}: ISubmitButton) {
	const isPrimary = variant === 'primary'
	const bgColor = variant === 'primary' ? 'accent-bg' : variant === 'cancel' ? 'cancel-bg' : ''
	return (
		<button
			type={isPrimary ? 'submit' : 'button'}
			className={`button-style submit ${bgColor} ${className && className}`}
			disabled={disabled || submitted}
			{...rest}
		>
			<div className="center">
				{submitted ? (
					<>
						<AnimatedIcon
							animation="fa-spin"
							animateOnLoad
							iconName="fa fa-spinner"
						/>
						{textStatus}
					</>
				) : (
					<>
						{iconName && <AnimatedIcon iconName={iconName} />} {children}
					</>
				)}
			</div>
		</button>
	)
}
