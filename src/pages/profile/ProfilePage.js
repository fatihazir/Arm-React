import React, { useState, useEffect } from "react";
import "../../assets/css/profile.css"
import userProfileLayout from "../../hoc/userProfileLayout";
import { useSelector } from 'react-redux';
import {
    selectUser,
    deleteUser
} from '../../features/user/userSlice';

function ProfilePage() {
    const user = useSelector(selectUser);
    const [email, setEmail] = useState(user.email)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)

    return <>
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h6 className="border-bottom pb-2 mb-0 mb-3">Personal Info</h6>
            <form>

                <div className="col">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <div className="input-group mb-3">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <span className="input-group-text" id="basic-addon2">@</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                        <div className="input-group mb-3">
                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" placeholder="First Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                        </div>
                    </div>
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                        <div className="input-group mb-3">
                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" placeholder="Last Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>

    </>
}

export default userProfileLayout(ProfilePage);