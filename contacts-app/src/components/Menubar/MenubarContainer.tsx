import React, { ComponentProps } from 'react'
import { Item, Menubar } from '@/components'

interface IMenubarContainer {
	contactsCount: number
	actionHandler: {
		open: (id?: string) => void
		sync: () => Promise<void>
	}
}
export function MenubarContainer({ contactsCount, actionHandler }: IMenubarContainer) {
	// add/provide for menu details here
	const menus: Partial<ComponentProps<typeof Item>>[] = [
		{
			title: 'Add Contact',
			iconName: 'fa fa-plus',
			animation: 'fa fa-beat-fade',
			animateOnLoad: contactsCount > 0 ? false : true,
			onClick: () => actionHandler.open(),
		},
		{
			title: 'Sync Contacts',
			iconName: 'fa fa-arrows-rotate',
			animation: 'fa fa-spin',
			onClick: () => actionHandler.sync(),
		},
	]

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
