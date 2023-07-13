import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as contactActions from '../../shared/actions/contactFormActions';

import { createUser, updateUser } from '../../services/ContactService';

class ContactForm extends React.Component {
    // const ContactForm = (props) => {
    render() {

        const { user, setUser, id, name, setName, email, setEmail, mobileNumber, setMobileNumber } = this.props;

        const save = async (event, user) => {
            try {
                if (Object.keys(user).length === 0) {

                    console.log(`CREATE`);
                    const response = await createUser({
                        name: name,
                        email: email,
                        mobileNumber: mobileNumber,
                    });
                }
                else {
                    console.log(`UPDATE`);
                    const response = await updateUser(user.id, {
                        name: name,
                        email: email,
                        mobileNumber: mobileNumber,
                    });
                }
            } catch (err) {
                alert(err);
            }
        }

        const onChangeValue = (e) => {
            let userData = user
            if (e.target.name === 'name') {
                userData.name = e.target.value;
            } else if (e.target.name === 'email') {
                userData.email = e.target.value;
            } else if (e.target.name === 'mobileNumber') {
                userData.mobileNumber = e.target.value;
            }
            setUser(userData)
        }

        return (
            <div>
                <div className="container mt-5">
                    <h2 className="mb-3">Contact Form</h2>
                    <form>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="name">
                                Name
                            </label>
                            <input className="form-control" type="hidden" id="id" value={id} />
                            <input className="form-control" type="text" name="name" id="name" value={name}
                                onChange={(event) => {
                                    setName(event.target.value)
                                }} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input className="form-control" type="email" name="email" id="email" value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="message">
                                Mobile
                            </label>
                            <input className="form-control" type="number" name="mobileNumber" id="mobileNumber" value={mobileNumber}
                                onChange={(event) => {
                                    setMobileNumber(event.target.value)
                                }} />
                        </div>
                        <button className="btn btn-danger" onClick={(event) => {
                            save(event.target.value, user)
                        }}>
                            Save
                        </button>
                    </form>
                </div>

                {/* <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea className="form-control" rows="5"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form> */}
            </div>
        );

    }
}

function mapStateToProps(storeState, componentProps) {
    const { contact } = storeState;
    return { contact };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(contactActions, dispatch) }
}

export default ContactForm;