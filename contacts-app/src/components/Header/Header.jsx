import React, { useState } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AddEditContact from "../AddEditContactModal/AddEditContactModal.jsx";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
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
			<Navbar
				bg="dark"
				data-bs-theme="dark"
				className="bg-body-tertiary sticky-top mb-3 px-4 py-3"
			>
				<Container>
					<Navbar.Brand href="#home">Contacts</Navbar.Brand>
					<Button variant="success" onClick={() => setIsFormModalOpen(true)}>
						New
						<FontAwesomeIcon icon={faPlus} />
					</Button>
				</Container>
			</Navbar>
			{newContactFormMarkup}
		</>
	);
};

export default Header;
