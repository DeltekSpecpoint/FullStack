import { useRef, useState } from 'react'
import { CreateError } from '@/utils'
import { TContact, TStatus } from '@/types'

export function useCopyClipboard() {
	const [clipboardStatus, setClipboardStatus] = useState<TStatus>({
		success: false,
		message: '',
	})
	const timerId = useRef<NodeJS.Timeout>()

	// reset/clear status notification
	const startCountdown = () => {
		if (timerId) {
			timerId.current = setTimeout(() => {
				setClipboardStatus({ success: false, message: '' })
				clearTimeout(timerId.current)
				timerId.current = undefined
			}, 5000)
		}
	}

	async function copyClipboard(value: string, key: keyof TContact | string) {
		try {
			await navigator.clipboard.writeText(value)
			setClipboardStatus({
				success: true,
				message: `${key ? `${key} Copied!` : 'Copied to clipboard!'}`,
			})
			startCountdown()
		} catch (err) {
			console.log(`Failed to copy text: ${CreateError(err).message}`)
		}
	}

	return {
		copyClipboard,
		clipboardStatus,
	}
}
