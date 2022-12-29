import React from "react";
import "../../assets/css/login.css"
import { Link } from 'react-router-dom';
import authLayout from "../../hoc/authLayout";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordAgain: "",
    };
  }

  HandleFirstNameInput = (e) => {
    console.log(e.target.value)
    this.setState({
      firstName: e.target.value
    });
  }

  HandleLastNameInput = (e) => {
    console.log(e.target.value);
    this.setState({
      lastName: e.target.value
    });
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

  HandlePasswordAgainInput = (e) => {
    console.log(e.target.value);
    this.setState({
      passwordAgain: e.target.value
    });
  }

  Submit = () => {
    console.log(this.state.firstName + " -- " + this.state.lastName + "-- ", this.state.email + " -- " + this.state.password + " -- " + this.state.passwordAgain);
  }

  render() {
    return <>
      <div className="reset-password-section text-center">
        <h3><i className="fa fa-user-plus fa-4x"></i></h3>
      </div>
      <form className="login-form">
        <div className="d-flex align-items-center my-4">
          <h1 className="text-center fw-normal mb-0 me-3">Sign Up</h1>
        </div>
        {/* <!-- First name input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3">First Name</label>
          <input onChange={this.HandleFirstNameInput} type="text" id="form3Example3" className="form-control form-control-lg"
            placeholder="Enter your first name" />
        </div>

        {/* <!-- Last name input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3">Last Name</label>
          <input onChange={this.HandleLastNameInput} type="text" id="form3Example3" className="form-control form-control-lg"
            placeholder="Enter your last name" />
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

        {/* <!-- Password again input --> */}
        <div className="form-outline mb-3">
          <label className="form-label" htmlFor="form3Example4">Password again</label>
          <input onChange={this.HandlePasswordAgainInput} type="password" id="form3Example4" className="form-control form-control-lg"
            placeholder="Enter password again" />
        </div>

        <div className="text-center text-lg-start">
          <button onClick={this.Submit} type="button" class="btn btn-primary btn-lg">Sign up</button>
          <p className="small fw-bold mt-2 pt-1 mb-0">Have an account already? <a href="/login"
            className="link-danger">Sign in</a></p>
        </div>
      </form>
    </>
  }
}

export default authLayout(Register);