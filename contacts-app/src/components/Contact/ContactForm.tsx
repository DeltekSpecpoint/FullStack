import '@/assets/modules/Form.css'
import {
	AnchorWrapper,
	AnimatedIcon,
	Button,
	ContactCard,
	Header,
	InlineNotification,
} from '@/components'
import { useCopyClipboard } from '@/hooks/utils/useCopyClipboard'
import { IChildren, TContact, TFormActions, TFunction, TModalActions } from '@/types'
import { IsEmpty } from '@/utils'
import { ChangeEvent, useEffect, useRef } from 'react'

interface IContactInfo extends IChildren {
	currentContact: TContact
	mutateCurrentContact: TFunction<TContact>
	modalActions: TModalActions
	toggleBookmark: TFunction<[id: string]>
	formAction?: TFormActions
}
export default function ContactForm({
	children,
	currentContact,
	mutateCurrentContact,
	modalActions,
	toggleBookmark,
	formAction,
}: IContactInfo) {
	const { copyClipboard, clipboardStatus } = useCopyClipboard()
	const { id, firstName, lastName, mobile, email, address } = currentContact
	const firstNameRef = useRef<HTMLInputElement>(null)

	const isAddOrEdit = !IsEmpty(formAction)
	const isEdit = formAction === 'Edit'
	const canSubmit = !IsEmpty(firstName) || !IsEmpty(lastName)
	const bookmarkAction = canSubmit ? toggleBookmark : () => null

	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const prop = evt.target.id
		const value = evt.target.value
		mutateCurrentContact({ ...currentContact, [prop]: value })
	}

	useEffect(() => {
		firstNameRef.current?.focus()
	}, [])

	return (
		<>
			{/* Open contact card */}
			{!isAddOrEdit && (
				<ContactCard
					{...currentContact}
					toggleBookmark={bookmarkAction}
					handleClick={() => modalActions.close()}
				/>
			)}

			{/* Add/Edit/Delete contact card */}
			{isAddOrEdit && (
				<>
					<ContactCard
						{...currentContact}
						toggleBookmark={bookmarkAction}
					/>

					<Header>
						<Header.Logo>{isEdit ? 'Edit Contact' : 'Add Contact'}</Header.Logo>
						<Header.Title subTitle="We will save this contact in your local storage and in cloud." />
					</Header>

					<div className="mb-34">
						<div
							className="field-container"
							onClick={() => copyClipboard(firstName, 'First Name')}
						>
							<AnimatedIcon
								title="First Name"
								className={`action-button small active scale-down`}
								iconName={`fa fa-user${isEdit ? '' : '-plus'} scale-up`}
							/>
							<input
								ref={firstNameRef}
								id="firstName"
								type="text"
								placeholder="First Name"
								className="contact-detail"
								maxLength={50}
								value={firstName}
								onChange={onChange}
							/>
						</div>
						<div
							className="field-container"
							onClick={() => copyClipboard(lastName, 'Last Name')}
						>
							<input
								id="lastName"
								type="text"
								placeholder="Last Name"
								className="contact-detail"
								maxLength={50}
								value={lastName}
								onChange={onChange}
							/>
						</div>
					</div>
				</>
			)}

			{/* First and Last name */}
			<div className="mb-34">
				<div
					className="field-container"
					onClick={() => copyClipboard(mobile, 'Mobile')}
				>
					<AnimatedIcon
						title="Mobile"
						className={`action-button small active scale-down`}
						iconName="fa fa-phone scale-up"
					/>
					{!isAddOrEdit ? (
						<p className="contact-detail">{mobile}</p>
					) : (
						<input
							id="mobile"
							type="tel"
							inputMode="tel"
							className="contact-detail"
							placeholder="Mobile Number"
							maxLength={20}
							value={mobile}
							onChange={onChange}
						/>
					)}
				</div>

				<div
					className="field-container"
					onClick={() => copyClipboard(email, 'Email')}
				>
					<AnchorWrapper href={email ? `mailto:${email}` : ''}>
						<AnimatedIcon
							title="Email"
							className={`action-button small active scale-down`}
							iconName="fa fa-solid fa-envelope-open scale-up"
						/>
					</AnchorWrapper>

					{!isAddOrEdit ? (
						<p className="contact-detail">{email}</p>
					) : (
						<input
							id="email"
							type="email"
							inputMode="email"
							className="contact-detail"
							placeholder="Email"
							maxLength={50}
							value={email}
							onChange={onChange}
						/>
					)}
				</div>

				<div
					className="field-container"
					onClick={() => copyClipboard(address, 'Address')}
				>
					<AnimatedIcon
						title="Address"
						className={`action-button small active scale-down`}
						iconName="fa fa-solid fa-location-dot scale-up"
					/>

					{!isAddOrEdit ? (
						<p className="contact-detail">{address}</p>
					) : (
						<input
							id="address"
							type="text"
							className="contact-detail"
							placeholder="Complete Address"
							value={address}
							onChange={onChange}
						/>
					)}
				</div>
			</div>
			{clipboardStatus.success && (
				<InlineNotification iconName="fa-solid fa-circle-check">
					{clipboardStatus.message}
				</InlineNotification>
			)}

			{/* submit buttons */}
			<div className="center">
				{!isAddOrEdit ? (
					<>
						<Button
							variant="cancel"
							iconName="fa fa-trash-can"
							onClick={() => modalActions.remove(id)}
						>
							Remove
						</Button>
						<Button
							variant="default"
							iconName="fa fa-trash-can"
							onClick={() => modalActions.open(id, true)}
						>
							Edit Contact
						</Button>
					</>
				) : (
					<Button
						id="cancel"
						title="Cancel"
						variant="default"
						disabled={false}
						onClick={() => modalActions.close()}
					>
						Cancel
					</Button>
				)}

				{isAddOrEdit && (
					<Button
						disabled={!canSubmit}
						onClick={() => {
							modalActions.commitChanges(currentContact)
							modalActions.close()
						}}
					>
						{isEdit ? 'Save' : 'Add'}
					</Button>
				)}
			</div>

			{children}
		</>
	)
}
