import React, { useEffect, useState } from "react";
import axios from "axios";

import AddEditContact from "../AddEditContactModal/AddEditContactModal.jsx";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const ContactList = () => {
	const [contactsList, setContactsList] = useState([]);
	const [isFormModalOpen, setIsFormModalOpen] = useState(false);
	const [editContactData, setEditContactData] = useState([]);

	const getContacts = () => {
		axios
			.get("https://localhost:44305/api/Contact")
			.then((res) => {
				setContactsList(res.data);
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		getContacts();
	}, []);

	const handleEdit = (contactData) => {
		setEditContactData(contactData);
		setIsFormModalOpen(true);
	};

	const handleDelete = (id) => {
		axios
			.delete(`https://localhost:44305/api/Contact/${id}`)
			.then((res) => {
				setContactsList(contactsList.filter((el) => el.id !== id));
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<Container>
				<Row className="justify-content-md-center">
					{contactsList.length > 0
						? contactsList.map((c, idx) => {
								return (
									<Col key={idx} md="auto">
										<Card style={{ width: "18rem" }} className="mb-2">
											<Card.Header>{c.fullName}</Card.Header>
											<Card.Body>
												<ListGroup variant="flush">
													<ListGroup.Item>Phone: {c.phone}</ListGroup.Item>
													<ListGroup.Item>Email: {c.email}</ListGroup.Item>
												</ListGroup>
												<ButtonGroup>
													<Button
														key={idx}
														size="sm"
														variant="primary"
														onClick={() => handleEdit(c)}
													>
														Edit
													</Button>
													<Button
														size="sm"
														variant="danger"
														onClick={() => handleDelete(c.id)}
													>
														Delete
													</Button>
												</ButtonGroup>
											</Card.Body>
										</Card>
									</Col>
								);
						  })
						: null}
				</Row>
				{isFormModalOpen && (
					<AddEditContact
						data={{
							title: "Edit Contact",
							formType: "edit",
							buttonName: "Save",
							contactData: editContactData,
							isFormModalOpen,
							setIsFormModalOpen,
						}}
					/>
				)}
			</Container>
		</>
	);
};

export default ContactList;
