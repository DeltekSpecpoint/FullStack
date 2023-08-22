import type { IChildren } from "@/types"
import '@/assets/modules/Header.css'
import { Logo } from "@/components/Header/Header.Logo"
import { Title } from "@/components/Header/Title"
import { Status } from "@/components/Header/Status"

interface IHeaderProps extends IChildren { }

export function Header({ children, ...props }: IHeaderProps) {
	return <header {...props}>{children}</header>
}

Header.Logo = Logo
Header.Title = Title
Header.Status = Status
