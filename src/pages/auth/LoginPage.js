import React from "react";
import "../../assets/css/login.css"
import authLayout from "../../hoc/authLayout";
import Apibase from "../../assets/lib/Apibase"
import { links } from "../../assets/lib/Constants";
import ErrorModal from './../../components/ErrorModal';
import Loading from "../../components/Loading";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showErrorModal: false,
            errorModalBodyText: "",
            showOverlay: false,
            showLoading: false
        };
    }

    HandleEmailInput = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    HandlePasswordInput = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    CloseErrorModal = () => {
        this.setState({
            showErrorModal: false,
            showOverlay: false,
        });
    }

    Login = () => {
        this.setState({
            showOverlay: true,
            showLoading: true
        });

        let body = {
            "Email": this.state.email,
            "Password": this.state.password,
        }
        Apibase.Post({
            url: links.login,
            body,
            successFunction: (data) => {
                window.location.href = '/'
            },
            errorFunction: (data) => {
                this.setState({
                    showOverlay: true,
                    showLoading: false,
                    errorModalBodyText: data.message,
                    showErrorModal: true
                });
            },
            exceptionFunction: (err) => {
                console.log("exceptionFunction data : ", err)
                this.setState({
                    showOverlay: true,
                    showLoading: false,
                    errorModalBodyText: err.toString(),
                    showErrorModal: true
                });
            }
        })
    }

    render() {
        return <>
            <Loading showOverlay={this.state.showOverlay} showLoading={this.state.showLoading} />
            <ErrorModal show={this.state.showErrorModal} body={this.state.errorModalBodyText} firstButtonOnPress={this.CloseErrorModal} />
            <div className="reset-password-section text-center">
                <h3><i className="fa fa-sign-in fa-4x"></i></h3>
            </div>
            <form className="login-form">
                <div className="d-flex align-items-center my-4">
                    <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
                </div>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                    <input onChange={this.HandleEmailInput} type="email" id="form3Example3" className="form-control form-control-lg"
                        placeholder="Enter a valid email address" />
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                    <input onChange={this.HandlePasswordInput} type="password" id="form3Example4" className="form-control form-control-lg"
                        placeholder="Enter password" />
                </div>

                <div className="text-center text-lg-start">
                    <button onClick={this.Login} type="button" class="btn btn-primary btn-lg">Sign in</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                        className="link-danger">Sign Up</a></p>
                </div>
            </form>
        </>
    }
}

export default authLayout(LoginPage)