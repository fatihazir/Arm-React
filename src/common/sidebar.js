import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUser,
    deleteUser
} from '../features/user/userSlice';

function Sidebar() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    function SignOut() {
        dispatch(deleteUser())
    }

    return <div className="border-end sidenav" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom text-center">
            <Link to="/">
                <img style={{ width: '5vw' }} alt="Alt content" src={require('./../assets/images/logo.png')} />
            </Link>
        </div>

        {user.id && <>
            <PerfectScrollbar className="sidebar-items">
                <ul className="list-unstyled ps-0">
                    <li className="mb-1">
                        <Link tag="a" className="" to="/">
                            <i className="fa fa-dashboard"></i> Associations
                        </Link>
                    </li>
                </ul>
            </PerfectScrollbar>

            <div className="dropdown fixed-bottom-dropdown">
                <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.photoUrl ?
                        <img style={{ height: '2vw', width: '2vw', borderRadius: '1vw' }} src={user.photoUrl}></img>
                        :
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                    }
                    <span style={{ marginLeft: 12 }}>{user.firstName} {user.lastName}</span>
                </a>
                <ul className="dropdown-menu text-small shadow text-center" aria-labelledby="dropdownUser2">
                    <li>
                        <li><button onClick={() => window.location.href = '/profile'} type="button" class="btn btn-primary btn-lg btn-block">
                            <i className="fa fa-user-circle" aria-hidden="true"></i> Profile</button></li>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button onClick={SignOut} type="button" class="btn btn-primary btn-lg btn-block"><i className="fa fa-sign-out" aria-hidden="true"> Sign out</i></button></li>
                </ul>
            </div>
        </>}
    </div>


}
export default Sidebar;