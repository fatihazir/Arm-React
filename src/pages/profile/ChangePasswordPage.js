import React, { useState } from "react";
import "../../assets/css/profile.css"
import userProfileLayout from "../../hoc/userProfileLayout";

function ProfilePage() {
    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [newPasswordAgain, setNewPasswordAgain] = useState()

    return <>
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h6 className="border-bottom pb-2 mb-0 mb-3">Change Password</h6>

            <div className="row">
                <div className="col-4">
                    <p>Your Password must contain</p>
                    <p> <i className="fa fa-check"></i> At least 8 characters.</p>
                </div>
                <div className="col-8">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Current Password</label>
                            <div className="input-group mb-3">
                                <input onChange={(e) => setCurrentPassword(e.target.value)} type="password" className="form-control" placeholder="Current Password" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <span className="input-group-text" id="basic-addon2"><i className="fa fa-key"></i></span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">New Password</label>
                            <div className="input-group mb-3">
                                <input onChange={(e) => setNewPassword(e.target.value)} type="password" className="form-control" placeholder="New Password" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <span className="input-group-text" id="basic-addon2"><i className="fa fa-key"></i></span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Confirm New Password</label>
                            <div className="input-group mb-3">
                                <input onChange={(e) => setNewPasswordAgain(e.target.value)} type="password" className="form-control" placeholder="Confirm New Password" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <span className="input-group-text" id="basic-addon2"><i className="fa fa-key"></i></span>
                            </div>
                        </div>
                        <hr />
                        <button type="submit" className="btn btn-primary">Change password</button>
                    </form>
                </div>
            </div>
        </div>

    </>

}

export default userProfileLayout(ProfilePage);