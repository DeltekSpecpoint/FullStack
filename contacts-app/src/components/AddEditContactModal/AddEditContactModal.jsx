import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

import Environment from "../../utilities/environment.js";

const AddEditContactModal = (props) => {
	const [validated, setValidated] = useState(false);
	const [contactData, setContactData] = useState({
		fullName: "",
		phone: "",
		email: "",
	});

	useEffect(() => {}, []);

	const handleFormChange = (e) => {
		const { value, id } = e.target;

		setContactData({
			fullName: id == "form.fullName" ? value : contactData.fullName,
			phone: id == "form.phone" ? value : contactData.phone,
			email: id == "form.email" ? value : contactData.email,
		});
	};

	const handleAddEdit = (e) => {
		let form = e.currentTarget;

		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			setValidated(true);

			const contactId =
				props.data.formType == "create" ? "" : props.data.contactData.id;
			const method = props.data.formType == "create" ? "post" : "put";

			if (validated) {
				axios({
					method: method,
					url: Environment.URL_API + contactId,
					data: contactData,
				})
					.then((res) => {
						props.data.setIsFormModalOpen(false);
					})
					.catch((err) => console.error(err));
			}
		}
	};

	return (
		<Modal show={props.data.isFormModalOpen} backdrop="static" keyboard={false}>
			<Modal.Header>
				<Modal.Title>{props.data.title}</Modal.Title>
			</Modal.Header>
			<Form noValidate validated={validated}>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="form.firstName">
						<Form.Label>First Name</Form.Label>
						{props.data.formType == "create" ? (
							<Form.Control
								required
								type="text"
								onChange={(e) => handleFormChange(e)}
							/>
						) : (
							<Form.Control
								required
								type="text"
								defaultValue={props.data.contactData.firstName}
								onChange={(e) => handleFormChange(e)}
							/>
						)}
						<Form.Control.Feedback type="invalid">
							Provide first name.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="form.lastName">
						<Form.Label>Last Name</Form.Label>
						{props.data.formType == "create" ? (
							<Form.Control
								required
								type="text"
								onChange={(e) => handleFormChange(e)}
							/>
						) : (
							<Form.Control
								required
								type="text"
								defaultValue={props.data.contactData.lastName}
								onChange={(e) => handleFormChange(e)}
							/>
						)}
						<Form.Control.Feedback type="invalid">
							Provide last name.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="form.phone">
						<Form.Label>Phone</Form.Label>
						{props.data.formType == "create" ? (
							<Form.Control
								required
								type="text"
								onChange={(e) => handleFormChange(e)}
							/>
						) : (
							<Form.Control
								required
								type="text"
								defaultValue={props.data.contactData.phone}
								onChange={(e) => handleFormChange(e)}
							/>
						)}
						<Form.Control.Feedback type="invalid">
							Provide a phone number.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="form.email">
						<Form.Label>Email</Form.Label>
						{props.data.formType == "create" ? (
							<Form.Control
								required
								type="email"
								onChange={(e) => handleFormChange(e)}
							/>
						) : (
							<Form.Control
								required
								type="email"
								defaultValue={props.data.contactData.email}
								onChange={(e) => handleFormChange(e)}
							/>
						)}
						<Form.Control.Feedback type="invalid">
							Provide a valid email address.
						</Form.Control.Feedback>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => props.data.setIsFormModalOpen(false)}
					>
						Cancel
					</Button>
					<Button variant="primary" onClick={(e) => handleAddEdit(e)}>
						{props.data.buttonName}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};
export default AddEditContactModal;
