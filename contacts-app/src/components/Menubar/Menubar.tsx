import type { IChildren } from "@/types"
import { Item } from "@/components/Menubar/Item"

export function Menubar({ children }: IChildren) {
	return <section className="form-container contact-menu">{children}</section>
}

Menubar.Item = Item
