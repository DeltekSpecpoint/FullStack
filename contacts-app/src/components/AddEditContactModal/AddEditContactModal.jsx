import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	setIsFormModalOpen,
	setCurrentContactData,
	setFormChecks,
} from "../../reducers.js";
import Environment from "../../utilities/environment.js";
import axios from "axios";
import "./AddEditContactModal.css";
import { Button, Modal, Form } from "react-bootstrap";

const AddEditContactModal = () => {
	const dispatch = useDispatch();
	const { isFormModalOpen, modalDetails, currentContactData, formChecks } =
		useSelector((state) => state.contact);

	const isFieldEmpty = (value) => {
		return value.length > 0;
	};

	const isMobileEmailValid = (type, value) => {
		const phonePattern =
			/^(\([0-9]{3}\)\s*|[0-9]{3}[-\s]*)[0-9]{3}[-\s]*[0-9]{4}$/;
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const pattern = type == "phone" ? phonePattern : emailPattern;

		return pattern.test(value);
	};

	const handleFormFieldChecks = (e) => {
		const { name, value } = e.target;

		switch (name) {
			case "firstName":
				dispatch(setFormChecks({ ...formChecks, [name]: isFieldEmpty(value) }));
				break;
			case "lastName":
				dispatch(setFormChecks({ ...formChecks, [name]: isFieldEmpty(value) }));
				break;
			case "phone":
				dispatch(
					setFormChecks({
						...formChecks,
						[name]: isFieldEmpty(value) && isMobileEmailValid("phone", value),
					})
				);
				break;
			case "email":
				const isEmailValid =
					isFieldEmpty(value) && isMobileEmailValid("email", value);

				dispatch(
					setFormChecks({
						...formChecks,
						[name]: isEmailValid,
					})
				);
				break;
		}
	};

	const handleFormChange = (e) => {
		handleFormFieldChecks(e);
		const { name, value } = e.target;

		dispatch(setCurrentContactData({ ...currentContactData, [name]: value }));
	};

	const handleAddEdit = (e) => {
		let form = e.currentTarget;

		// if (
		// 	formChecks.firstName &&
		// 	formChecks.lastName &&
		// 	formChecks.phone &&
		// 	formChecks.email
		// ) {
		// setValidated(true);
		// let form = e.currentTarget;
		// if (form.checkValidity() === false) {
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// } else {
		// 	setValidated(true);
		// 	const contactId =
		// 		modalDetails.type == "create" ? "" : currentContactData.id;
		// 	const method = modalDetails.type == "create" ? "post" : "put";
		// 	if (validated) {
		// 		axios({
		// 			method: method,
		// 			url: Environment.URL_API + contactId,
		// 			data: currentContactData,
		// 		})
		// 			.then((res) => {
		// 				dispatch(setIsFormModalOpen(false));
		// 			})
		// 			.catch((err) => console.error(err));
		// 	}
		// }
		// } else setValidated(false);
	};

	return (
		<Modal show={isFormModalOpen} backdrop="static" keyboard={false}>
			<Modal.Header>
				<Modal.Title>{modalDetails.title}</Modal.Title>
			</Modal.Header>
			<Form>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="form.firstName">
						<Form.Label>First Name</Form.Label>
						<Form.Control
							required
							type="text"
							name="firstName"
							defaultValue={currentContactData.firstName}
							onChange={handleFormChange}
						/>
						{currentContactData.lastName.length > 0 && !formChecks.firstName ? (
							<span className="fieldInvalid">Provide first name.</span>
						) : null}
					</Form.Group>
					<Form.Group className="mb-3" controlId="form.lastName">
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							required
							type="text"
							name="lastName"
							defaultValue={currentContactData.lastName}
							onChange={handleFormChange}
						/>
						{currentContactData.lastName.length > 0 && !formChecks.lastName ? (
							<span className="fieldInvalid">Provide last name.</span>
						) : null}
					</Form.Group>
					<Form.Group className="mb-3" controlId="form.phone">
						<Form.Label>Phone</Form.Label>
						<Form.Control
							required
							type="text"
							name="phone"
							defaultValue={currentContactData.phone}
							onChange={handleFormChange}
						/>
						{currentContactData.lastName.length > 0 && !formChecks.phone ? (
							<span className="fieldInvalid">
								Provide a valid phone number.
							</span>
						) : null}
					</Form.Group>
					<Form.Group className="mb-3" controlId="form.email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							required
							type="email"
							name="email"
							defaultValue={currentContactData.email}
							onChange={handleFormChange}
						/>
						{currentContactData.lastName.length > 0 && !formChecks.email ? (
							<span className="fieldInvalid">
								Provide a valid email address.
							</span>
						) : null}
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => dispatch(setIsFormModalOpen(false))}
					>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleAddEdit}>
						{modalDetails.buttonLabel}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};
export default AddEditContactModal;
