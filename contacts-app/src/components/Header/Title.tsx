import type { IChildren } from '@/types'

interface ITitle extends IChildren {
	title?: string
	subTitle?: string
}

export function Title({ children, title, subTitle }: ITitle) {
	return (
		<div>
			{title && <h1 className="fade-in">{title}</h1>}
			{subTitle && <p className="center regular descend">{subTitle}</p>}
			{children}
		</div>
	)
}
