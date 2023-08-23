import { useState } from 'react'
import { createPortal } from 'react-dom'
import '@/assets/modules/Modal.css'
import type { IChildren, TFunction } from '@/types'
import { CloseIcon, BackdropOverlay } from '@/components'

interface IModal extends IChildren {
	isOpen: boolean
	noBackdrop: boolean
	hideCloseIcon: boolean
	clickBackdropToClose: boolean
	onClose: TFunction
}

export function Modal({
	children,
	isOpen = true,
	onClose,
	noBackdrop = false,
	hideCloseIcon,
	clickBackdropToClose = true,
}: Partial<IModal>) {
	const [close, setClose] = useState(false)
	const modalRoot = document.getElementById('modal-root')

	const handleClose = () => {
		if (onClose) return onClose()
		setClose(true)
	}

	if (!modalRoot || !isOpen || close) return null

	return createPortal(
		<div className="modal-wrapper">
			{!noBackdrop && <BackdropOverlay onClick={clickBackdropToClose ? handleClose : () => null} />}
			<div className="modal-container form-container descend">
				{!hideCloseIcon && <CloseIcon onClick={handleClose} />}
				{children}
			</div>
		</div>,
		modalRoot
	)
}
