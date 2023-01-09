import React from "react";
import Sidebar from './../common/sidebar';
import { useSelector } from 'react-redux';
import {
    selectUser
} from '../features/user/userSlice';
import NotLoggedIn from "../components/NotLoggedIn";

const adminLayout = (ChildComponent) => {
    function AdminLayout() {
        const user = useSelector(selectUser);

        function RenderMainContent() {
            if (user.id) {
                return <ChildComponent />
            } else {
                return <NotLoggedIn />
            }
        }

        return (<div className="d-flex" id="wrapper">
            {/* <!-- Sidebar--> */}
            <Sidebar />
            {/* <!-- Page content wrapper--> */}
            <div className="main" id="page-content-wrapper">
                {/* <!-- Page content--> */}
                <div className="container-fluid content-container">
                    {RenderMainContent()}
                </div>
            </div>
        </div>)
    }

    return AdminLayout;
}

export default adminLayout;