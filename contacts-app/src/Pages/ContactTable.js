function ContactTable(props) {
    return (
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ContactId</th>
                                <th scope="col">Name</th>
                                <th scope="col">Number</th>
                                <th scope="col">Address</th>
                                <th scope="col">EmailAddress</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props && props.contacts.map((contactItem) =>
                                <tr key={contactItem.contactId}>
                                    <td>{contactItem.contactId}</td>
                                    <td>{contactItem.name}</td>
                                    <td>{contactItem.number}</td>
                                    <td>{contactItem.address}</td>
                                    <td>{contactItem.emailAddress}</td>
                                    <td>
                                        <a href="#" className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons" onClick={() => props.handleUpdateContactVisibility(contactItem.contactId)}>&#xE254;</i></a>
                                        <a href="#" className="delete" title="Delete" data-toggle="tooltip" onClick={() => props.handleDelete(contactItem.contactId)}><i className="material-icons">&#xE872;</i></a>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="clearfix">
                        <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                        <ul className="pagination">
                            <li className="page-item disabled"><a href="#"><i className="fa fa-angle-double-left"></i></a></li>
                            <li className="page-item"><a href="#" className="page-link">1</a></li>
                            <li className="page-item"><a href="#" className="page-link">2</a></li>
                            <li className="page-item active"><a href="#" className="page-link">3</a></li>
                            <li className="page-item"><a href="#" className="page-link">4</a></li>
                            <li className="page-item"><a href="#" className="page-link">5</a></li>
                            <li className="page-item"><a href="#" className="page-link"><i className="fa fa-angle-double-right"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ContactTable;