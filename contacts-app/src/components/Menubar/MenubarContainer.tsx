import React, { ComponentProps } from "react"
import { Menubar } from "@/components"

interface IMenubarContainer {
	menus: Partial<ComponentProps<typeof Menubar.Item>>[]
}

export function MenubarContainer({ menus }: IMenubarContainer) {
	return (
		<aside>
			<Menubar>
				{menus.map(({ name, iconName, animation, onClick }, idx) => (
					<div key={idx}>
						{name && (
							<Menubar.Item
								{...{
									name,
									iconName,
									animation,
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
