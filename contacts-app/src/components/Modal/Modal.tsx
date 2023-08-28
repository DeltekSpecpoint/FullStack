import { createPortal } from 'react-dom'
import '@/assets/modules/Modal.css'
import type { IChildren, TFunction } from '@/types'
import { CloseIcon, BackdropOverlay } from '@/components'

interface IModal extends IChildren {
	isOpen: boolean
	noBackdrop: boolean
	hideCloseIcon: boolean
	clickBackdropToClose: boolean
	onCloseCallback: TFunction
}

export function Modal({
	children,
	isOpen = true,
	onCloseCallback,
	noBackdrop = false,
	hideCloseIcon,
	clickBackdropToClose = true,
}: Partial<IModal>) {
	const modalRoot = document.getElementById('modal-root')

	if (!modalRoot || !isOpen) return null

	return createPortal(
		<div className="modal-wrapper">
			{!noBackdrop && (
				<BackdropOverlay onClick={clickBackdropToClose ? onCloseCallback : () => null} />
			)}
			<div className="modal-container form-container descend">
				{!hideCloseIcon && <CloseIcon onClick={onCloseCallback} />}
				{children}
			</div>
		</div>,
		modalRoot
	)
}
