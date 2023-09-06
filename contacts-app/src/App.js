import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFormChecks } from "./reducers";

import Header from "./components/Header/Header";
import ContactList from "./components/ContactList/ContactList";
import AddEditContact from "./components/AddEditContactModal/AddEditContactModal.jsx";

function App() {
	const dispatch = useDispatch();
	const { isFormModalOpen } = useSelector((state) => state.contact);
	const formChecks = {
		isInitial: true,
		firstName: false,
		lastName: false,
		phone: false,
		email: false,
	};

	useEffect(() => {
		dispatch(setFormChecks(formChecks));
	}, [isFormModalOpen]);

	return (
		<div className="App">
			<Header />
			<ContactList />
			{isFormModalOpen && <AddEditContact />}
		</div>
	);
}

export default App;
