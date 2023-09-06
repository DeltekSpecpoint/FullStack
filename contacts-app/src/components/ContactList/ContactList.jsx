import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	setIsFormModalOpen,
	setModalDetails,
	setCurrentContactData,
} from "../../reducers.js";
import Environment from "../../utilities/environment.js";
import axios from "axios";
import {
	Container,
	Button,
	ButtonGroup,
	Card,
	Row,
	Col,
	Pagination,
	ListGroup,
	Form,
	InputGroup,
	Navbar,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPencil,
	faTrashCan,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import AddEditContact from "../AddEditContactModal/AddEditContactModal.jsx";

const ContactList = () => {
	const dispatch = useDispatch();
	const { isFormModalOpen, currentContactData } = useSelector(
		(state) => state.contact
	);

	const [contactsList, setContactsList] = useState([]);
	const [searchKey, setSearchKey] = useState("");
	const [shouldReload, setShouldReload] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const getContacts = () => {
		const skey = searchKey !== "" ? `&searchKey=${searchKey}` : "";

		axios
			.get(Environment.URL_API + `?page=${currentPage}&pageSize=12${skey}`)
			.then((res) => {
				setContactsList(res.data);
				setShouldReload(false);
			})
			.catch((err) => console.error(err));
	};

	const handleInputChange = (e) => {
		setSearchKey(e.target.value);
	};

	const handleSearchClick = () => {
		setShouldReload(true);
	};

	const handlePageChange = (pageNum) => {
		setCurrentPage(pageNum);
		setShouldReload(true);
	};

	const handleEdit = (contactData) => {
		const modalDetails = {
			type: "edit",
			title: "Edit Contact",
			buttonLabel: "Save",
		};

		dispatch(setModalDetails(modalDetails));
		dispatch(setCurrentContactData(contactData));
		dispatch(setIsFormModalOpen(true));
	};

	const handleDelete = (id) => {
		axios
			.delete(Environment.URL_API + id)
			.then((res) => {
				setContactsList(contactsList.filter((el) => el.id !== id));
				setShouldReload(true);
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		getContacts();
	}, [shouldReload]);

	return (
		<>
			<Container className="d-flex justify-content-center">
				<Row>
					{contactsList.length > 0
						? contactsList.map((c, idx) => {
								return (
									<Col key={idx} md="auto">
										<Card
											style={{ width: "18rem", height: "10rem" }}
											className="mb-2"
										>
											<Card.Header>
												<Row>
													<Col className="d-flex flex-row">{`${c.firstName} ${c.lastName}`}</Col>
													<Col className="d-flex flex-row-reverse">
														<ButtonGroup>
															<Button
																key={idx}
																size="sm"
																variant="primary"
																onClick={() => handleEdit(c)}
															>
																<FontAwesomeIcon icon={faPencil} />
															</Button>
															<Button
																size="sm"
																variant="danger"
																onClick={() => handleDelete(c.id)}
															>
																<FontAwesomeIcon icon={faTrashCan} />
															</Button>
														</ButtonGroup>
													</Col>
												</Row>
											</Card.Header>
											<Card.Body>
												<Row>
													<Col sm="3">
														<Form.Text>Phone</Form.Text>
													</Col>
													<Col sm="9">
														<ListGroup.Item>{c.phone}</ListGroup.Item>
													</Col>
												</Row>
												<Row>
													<Col sm="3">
														<Form.Text>Email</Form.Text>
													</Col>
													<Col sm="9">
														<ListGroup.Item>{c.email}</ListGroup.Item>
													</Col>
												</Row>
											</Card.Body>
										</Card>
									</Col>
								);
						  })
						: null}
				</Row>
			</Container>
			<footer className="footer">
				<Navbar bg="dark" variant="light" fixed="bottom">
					<Container>
						<Row>
							<Col xs sm>
								<Container className="mt-2">
									<InputGroup size="sm" className="mb-3">
										<Form.Control
											placeholder="Search"
											onChange={handleInputChange}
										/>
										<Button
											variant="outline-secondary"
											onClick={handleSearchClick}
										>
											<FontAwesomeIcon icon={faMagnifyingGlass} />
										</Button>
									</InputGroup>
								</Container>
							</Col>
							<Col xs sm className="d-flex flex-row-reverse">
								<Pagination className="mt-2" size="sm">
									<Pagination.Prev
										onClick={() => handlePageChange(currentPage - 1)}
										disabled={currentPage === 1}
									/>
									<Pagination.Item active>{currentPage}</Pagination.Item>
									<Pagination.Next
										onClick={() => handlePageChange(currentPage + 1)}
									/>
								</Pagination>
							</Col>
						</Row>
					</Container>
				</Navbar>
			</footer>
		</>
	);
};

export default ContactList;
