import React, { ComponentProps } from 'react'
import { Menubar } from '@/components'

interface IMenubarContainer {
	menus: Partial<ComponentProps<typeof Menubar.Item>>[]
}

export function MenubarContainer({ menus }: IMenubarContainer) {
	return (
		<aside>
			<Menubar>
				{menus.map(({ title, iconName, animation, animateOnLoad, onClick }, idx) => (
					<div key={idx}>
						{title && (
							<Menubar.Item
								{...{
									title,
									iconName,
									animation,
									animateOnLoad,
									onClick,
								}}
							/>
						)}
					</div>
				))}
			</Menubar>
		</aside>
	)
}
