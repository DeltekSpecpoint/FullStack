import type { IChildren } from '@/types'
import React from 'react'

interface IAnchorWrapper extends IChildren {
	href: string
	className?: string
}

export function AnchorWrapper({ href = '', className = '', children }: Partial<IAnchorWrapper>) {
	const isNode = React.isValidElement(children)

	return (
		<a
			className={className}
			style={{ textDecoration: isNode ? 'none' : '', color: 'currentcolor' }}
			href={href ? href : undefined}
			rel="noreferrer"
			target="_blank"
		>
			{children}
		</a>
	)
}
