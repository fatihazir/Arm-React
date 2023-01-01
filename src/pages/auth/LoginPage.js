import React, { useEffect, useState } from "react";
import "../../assets/css/login.css"
import authLayout from "../../hoc/authLayout";
import Apibase from "../../assets/lib/Apibase"
import { links } from "../../assets/lib/Constants";
import ErrorModal from './../../components/ErrorModal';
import Loading from "../../components/Loading";
import {
    setUser
} from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';

function LoginPage() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorModalBodyText, setErrorModalBodyText] = useState("")
    const [showOverlay, setShowOverlay] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    const Login = () => {
        setShowOverlay(true)
        setShowLoading(true)

        let body = {
            "Email": email,
            "Password": password,
        }

        Apibase.Post({
            url: links.login,
            body,
            successFunction: (data) => {
                dispatch(setUser(data.data))
                setTimeout(() => {
                    window.location.href = '/'
                }, 1500);
            },
            errorFunction: (data) => {
                setShowOverlay(true)
                setShowLoading(false)
                setErrorModalBodyText(data.message)
                setShowErrorModal(true)
            },
            exceptionFunction: (err) => {
                setShowOverlay(true)
                setShowLoading(false)
                setErrorModalBodyText(err.toString())
                setShowErrorModal(true)
            }
        })
    }

    const HandleEmailInput = (e) => {
        setEmail(e.target.value)
    }

    const HandlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    const CloseErrorModal = () => {
        setShowErrorModal(false)
        setShowOverlay(false)
    }

    return (
        <>
            <Loading showOverlay={showOverlay} showLoading={showLoading} />
            <ErrorModal show={showErrorModal} body={errorModalBodyText} firstButtonOnPress={CloseErrorModal} />
            <div style={{ paddingTop: 50 }} className="reset-password-section text-center">
                <h3><i className="fa fa-sign-in fa-4x"></i></h3>
            </div>
            <form className="login-form">
                <div className="d-flex align-items-center my-4">
                    <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
                </div>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                    <input onChange={HandleEmailInput} type="email" id="form3Example3" className="form-control form-control-lg"
                        placeholder="Enter a valid email address" />
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                    <input onChange={HandlePasswordInput} type="password" id="form3Example4" className="form-control form-control-lg"
                        placeholder="Enter password" />
                </div>

                <div className="text-center text-lg-start">
                    <button onClick={Login} type="button" class="btn btn-primary btn-lg">Sign in</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                        className="link-danger">Sign Up</a></p>
                </div>
            </form>
        </>
    )
}

export default authLayout(LoginPage)