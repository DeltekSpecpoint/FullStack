import '@/assets/modules/Form.css'
import {
	AnchorWrapper,
	AnimatedIcon,
	Button,
	ContactCard,
	Header,
	InlineNotification,
} from '@/components'
import { CONTACT_CONST } from '@/constants'
import { useCopyClipboard } from '@/hooks/utils/useCopyClipboard'
import { IChildren, TContact, TFunction, TModalActions } from '@/types'
import { IsEmpty } from '@/utils'
import { ChangeEvent } from 'react'

interface IContactInfo extends IChildren {
	openContact: TContact
	setOpenContact: TFunction<TContact>
	modalActions: Partial<TModalActions>
	toggleBookmark: TFunction<[id: string]>
	formAction?: 'Add' | 'Edit' | 'Open'
}
export default function ContactForm({
	children,
	openContact: currentContact,
	setOpenContact,
	modalActions,
	toggleBookmark,
	formAction,
}: IContactInfo) {
	const { copyClipboard, clipboardStatus } = useCopyClipboard()
	const isModify = !IsEmpty(formAction)
	const isEdit = formAction === 'Edit'

	const onChange = (formEvt: ChangeEvent<HTMLInputElement>) => {
		const prop = formEvt.target.id
		const value = formEvt.target.value
		setOpenContact({ ...currentContact, [prop]: value })
	}

	const canSubmit = !IsEmpty(currentContact.firstName) || !IsEmpty(currentContact.lastName)

	return (
		<>
			{!IsEmpty(currentContact) ? (
				<ContactCard
					onOpen={() => setOpenContact(CONTACT_CONST.INIT_CONTACT)}
					toggleBookmark={canSubmit ? toggleBookmark : () => null}
					{...currentContact}
				/>
			) : (
				<ContactCard
					toggleBookmark={canSubmit ? toggleBookmark : () => null}
					{...currentContact}
				/>
			)}

			{isModify && (
				<>
					<Header>
						<Header.Logo>{isEdit ? 'Edit Contact' : 'Add Contact'}</Header.Logo>
						<Header.Title subTitle="We will save this contact in your local storage and in cloud." />
					</Header>
				</>
			)}

			<div className="vr">
				{isModify && (
					<>
						<div className="field-container">
							<AnimatedIcon
								title="First Name"
								className={`action-button small active scale-down`}
								iconName="fa fa-user scale-up"
							/>
							<input
								type="text"
								id="firstName"
								placeholder="First Name"
								className="contact-detail"
								value={currentContact.firstName}
								onChange={onChange}
							/>
						</div>
						<div className="field-container">
							<input
								type="text"
								id="lastName"
								placeholder="Last Name"
								className="contact-detail"
								value={currentContact.lastName}
								onChange={onChange}
							/>
						</div>
					</>
				)}
			</div>

			<div className="vr">
				<div
					className="field-container"
					onClick={() => copyClipboard(currentContact.mobile, 'mobile')}
				>
					<AnimatedIcon
						title="Mobile"
						className={`action-button small active scale-down`}
						iconName="fa fa-phone scale-up"
					/>
					{!isModify ? (
						<p className="contact-detail">{currentContact.mobile}</p>
					) : (
						<input
							type="text"
							id="mobile"
							className="contact-detail"
							placeholder="Mobile Number"
							value={currentContact.mobile}
							onChange={onChange}
						/>
					)}
				</div>
				<div
					className="field-container"
					onClick={() => copyClipboard(currentContact.email, 'email')}
				>
					<AnchorWrapper href={`mailto:${currentContact.email}`}>
						<AnimatedIcon
							title="Email"
							className={`action-button small active scale-down`}
							iconName="fa fa-solid fa-envelope scale-up"
						/>
					</AnchorWrapper>

					{!isModify ? (
						<p className="contact-detail">{currentContact.email}</p>
					) : (
						<input
							type="text"
							id="email"
							className="contact-detail"
							placeholder="Email"
							value={currentContact.email}
							onChange={onChange}
						/>
					)}
				</div>
				<div
					className="field-container"
					onClick={() => copyClipboard(currentContact.address, 'address')}
				>
					<AnimatedIcon
						title="Address"
						className={`action-button small active scale-down`}
						iconName="fa fa-solid fa-map-location-dot scale-up"
					/>

					{!isModify ? (
						<p className="contact-detail">{currentContact.address}</p>
					) : (
						<input
							type="text"
							id="address"
							className="contact-detail"
							placeholder="Complete Address"
							value={currentContact.address}
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
			<div className="center">
				{!isModify ? (
					<Button
						props={{
							iconName: 'fa fa-pen-to-square',
						}}
						onClick={() => modalActions.open && modalActions.open(currentContact.id, true)}
					>
						Edit Contact
					</Button>
				) : (
					<Button
						props={{
							variant: 'cancel',
							disabled: false,
						}}
						onClick={() => {
							setOpenContact(CONTACT_CONST.INIT_CONTACT)
							modalActions.close && modalActions.close()
						}}
					>
						Cancel
					</Button>
				)}

				{isModify && (
					<Button
						props={{
							disabled: !canSubmit,
						}}
						onClick={() => {
							modalActions.commitChanges && modalActions.commitChanges(currentContact)
							modalActions.close && modalActions.close()
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
