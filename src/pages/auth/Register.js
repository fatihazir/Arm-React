import React from "react";
import "../../assets/css/login.css"
import authLayout from "../../hoc/authLayout";
import Apibase from "../../assets/lib/Apibase"
import { links } from "../../assets/lib/Constants";
import ErrorModal from './../../components/ErrorModal';
import Loading from "../../components/Loading";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordAgain: "",
      showErrorModal: false,
      errorModalBodyText: "",
      showOverlay: false,
      showLoading: false
    };
  }

  HandleFirstNameInput = (e) => {
    this.setState({
      firstName: e.target.value
    });
  }

  HandleLastNameInput = (e) => {
    this.setState({
      lastName: e.target.value
    });
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

  HandlePasswordAgainInput = (e) => {
    this.setState({
      passwordAgain: e.target.value
    });
  }

  CloseErrorModal = () => {
    this.setState({
      showErrorModal: false,
      showOverlay: false,
    });
  }

  Submit = () => {
    if (this.state.password !== this.state.passwordAgain) {
      this.setState({
        showErrorModal: true,
        showOverlay: true,
        errorModalBodyText: 'Passwords are not same.'
      });
    } else {
      this.setState({
        showOverlay: true,
        showLoading: true
      });

      let body = {
        "FirstName": this.state.firstName,
        "LastName": this.state.lastName,
        "Email": this.state.email,
        "Password": this.state.password,
      }

      Apibase.Post({
        url: links.register,
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
  }

  render() {
    return <>
      <Loading showOverlay={this.state.showOverlay} showLoading={this.state.showLoading} />
      <ErrorModal show={this.state.showErrorModal} body={this.state.errorModalBodyText} firstButtonOnPress={this.CloseErrorModal} />
      <div style={{ paddingTop: 50 }} className="reset-password-section text-center">
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