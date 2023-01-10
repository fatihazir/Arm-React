import React from "react";
import adminLayout from "../hoc/adminLayout"
import "./../assets/css/profile.css"
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import {
    selectUser,
    deleteUser
} from '../features/user/userSlice';

const userProfileLayout = (ChildComponent) => {
    function UserProfilePageHoc() {
        const user = useSelector(selectUser);

        return <>
            <div className="container">
                <div className="row profile">
                    <div className="col-md-3">
                        <div className="profile-sidebar">
                            <div className="my-3 p-3 bg-body rounded shadow-sm">

                                <div className="profile-userpic">
                                    <img src={user.photoUrl} className="img-responsive profile-img-center" alt="" />
                                </div>

                                <div className="profile-usertitle">
                                    <div className="profile-usertitle-name">
                                        {user.firstName} {user.lastName}
                                    </div>
                                </div>

                                <hr />
                                <div>
                                    <div className="bd-example">
                                        <div className="list-group">
                                            <NavLink to="/profile" className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}>Personal Info</NavLink>
                                            <NavLink to="/change-password" className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}>Change Password</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="profile-content">
                            <ChildComponent />
                        </div>
                    </div>
                </div>
            </div>
        </>

    }

    return adminLayout(UserProfilePageHoc);
}


export default userProfileLayout;