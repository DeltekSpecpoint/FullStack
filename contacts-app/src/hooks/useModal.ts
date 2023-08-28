import { ComponentProps, useState } from 'react'
import { Modal } from '@/components'

interface UseModalProps extends Omit<ComponentProps<typeof Modal>, 'children' | 'isOpen'> {}

export default function useModal({ onCloseCallback, ...props }: UseModalProps) {
	const [open, setOpen] = useState(false)

	const handleClose = () => {
		setOpen(false)
		// execute callback when there is
		if (onCloseCallback) return onCloseCallback()
	}

	return {
		...props,
		isOpen: open,
		closeModal: handleClose,
		openModal: () => setOpen(true),
	}
}
