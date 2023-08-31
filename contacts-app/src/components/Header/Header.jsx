import React, { useState } from "react";

import AddEditContact from "../AddEditContactModal/AddEditContactModal.jsx";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Header = (props) => {
	const [isFormModalOpen, setIsFormModalOpen] = useState(false);

	let newContactFormMarkup = null;

	if (isFormModalOpen) {
		newContactFormMarkup = (
			<AddEditContact
				data={{
					title: "Add New Contact",
					formType: "create",
					buttonName: "Create",
					isFormModalOpen,
					setIsFormModalOpen,
				}}
			/>
		);
	}

	return (
		<>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand href="#home">Contact App</Navbar.Brand>
					<Button variant="success" onClick={() => setIsFormModalOpen(true)}>
						New
					</Button>
				</Container>
			</Navbar>
			<Container>
				<InputGroup size="sm" className="mb-3">
					<Form.Control placeholder="Search" aria-label="Search" />
				</InputGroup>
			</Container>
			{newContactFormMarkup}
		</>
	);
};

export default Header;
