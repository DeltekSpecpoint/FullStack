function Header(props) {
    return (
        <div className="table-title">
            <div className="row">
                <div className="col-sm-8"><h2>Contact <b>Details</b></h2></div>
                <div className="col-sm-4">
                    <button type="button" class="btn btn-info add-new" onClick={props.handleAdd}><i class="fa fa-plus"></i> Add New</button>
                    <div className="search-box">
                        <i className="material-icons">&#xE8B6;</i>
                        <input type="text" className="form-control" placeholder="Search&hellip;" onChange={props.handleChange}></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;