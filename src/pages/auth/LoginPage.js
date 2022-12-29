import React from "react";
import "../../assets/css/login.css"
import { Link } from 'react-router-dom';
import authLayout from "../../hoc/authLayout";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };
    }

    HandleEmailInput = (e) => {
        console.log(e.target.value)
        this.setState({
            email: e.target.value
        });
    }

    HandlePasswordInput = (e) => {
        console.log(e.target.value);
        this.setState({
            password: e.target.value
        });
    }

    Login = () => {
        console.log(this.state.email + " -- " + this.state.password);
    }


    render() {
        return <>
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
                    <button onClick={this.Login} type="button" class="btn btn-primary btn-lg">Login</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                        className="link-danger">Sign Up</a></p>
                </div>
            </form>
        </>
    }
}

export default authLayout(LoginPage);