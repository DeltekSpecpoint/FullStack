import { AnimatedIcon } from "@/components"
import type { IChildren, TStatus } from "@/types"

interface IStatus extends IChildren {
	status?: TStatus
	icon?: string
}

export function Status({ children, status, icon }: IStatus) {
	const isSuccessfulWithMessage = status?.success && status.message

	return (
		<>
			{status && (
				<div
					className={`center fdc ${status.message ? "fade-in" : ""}`}
					style={{ opacity: `${status.message ? 1 : 0}` }}>
					{isSuccessfulWithMessage ? (
						<>
							<AnimatedIcon
								className={`${icon ? icon : ""}`}
								iconName={`fa ${icon ? icon : "fa-regular fa-circle-check"
									}`}
								animation={`${icon ? icon : "fa-beat-fade"}`}
								animateOnLoad
							/>
							<p className="center x-small descend">
								{status.message}
							</p>
						</>
					) : (
						status.message && (
							<>
								{!status.success && (
									<AnimatedIcon
										className="regular lit-error"
										iconName={`fa fa-solid ${icon
												? icon
												: "fa-triangle-exclamation"
											}`}
										animation="fa-beat-fade"
										animateOnLoad
									/>
								)}
								<p className="center x-small descend error">
									{status.message}
								</p>
							</>
						)
					)}
				</div>
			)}
			{children}
		</>
	)
}
