import React from "react";
import { useDispatch } from "react-redux";
import {
	setIsFormModalOpen,
	setModalDetails,
	setCurrentContactData,
} from "../../reducers.js";
import { Container, Navbar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddEditContact from "../AddEditContactModal/AddEditContactModal.jsx";

const Header = () => {
	const dispatch = useDispatch();
	const modalDetails = {
		type: "create",
		title: "Create Contact",
		buttonLabel: "Create",
	};
	const currentContactData = {
		id: "",
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
	};

	const handleNewBtnClick = () => {
		dispatch(setModalDetails(modalDetails));
		dispatch(setCurrentContactData(currentContactData));
		dispatch(setIsFormModalOpen(true));
	};

	return (
		<>
			<Navbar
				bg="dark"
				data-bs-theme="dark"
				className="bg-body-tertiary sticky-top mb-3 px-4 py-3"
			>
				<Container>
					<Navbar.Brand href="#home">Contacts</Navbar.Brand>
					<Button variant="success" onClick={handleNewBtnClick}>
						New
						<FontAwesomeIcon icon={faPlus} />
					</Button>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
