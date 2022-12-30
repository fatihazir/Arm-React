import React from "react";
import { links } from "../assets/lib/Constants";
import adminLayout from "../hoc/adminLayout"
import Apibase from "../assets/lib/Apibase"
import ErrorModal from './../components/ErrorModal';
import Loading from "../components/Loading";

class AssociationsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showErrorModal: false,
      errorModalBodyText: "",
      showOverlay: false,
      showLoading: false
    };
  }

  GetTransactionGroups = () => {
    this.setState({
      showOverlay: true,
      showLoading: true
    });

    Apibase.Get({
      url: links.transactionGroups + "?userId=" + "2",
      successFunction: (data) => {
        console.log("succcess : ", data);
        this.setState({
          showOverlay: false,
          showLoading: false
        });
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
        this.setState({
          showOverlay: true,
          showLoading: false,
          errorModalBodyText: err.toString(),
          showErrorModal: true
        });
      }
    })
  }
  componentDidMount() {
    console.log("cdm")
    this.GetTransactionGroups()
  }

  render() {
    return <>
      <Loading showOverlay={this.state.showOverlay} showLoading={this.state.showLoading} />
      <ErrorModal show={this.state.showErrorModal} body={this.state.errorModalBodyText} firstButtonOnPress={this.CloseErrorModal} />
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-primary o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-comments"></i>
              </div>
              <div className="mr-5">26 New Messages!</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="#">
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-warning o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-list"></i>
              </div>
              <div className="mr-5">11 New Tasks!</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="#">
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-success o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-shopping-cart"></i>
              </div>
              <div className="mr-5">123 New Orders!</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="#">
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-danger o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-support"></i>
              </div>
              <div className="mr-5">13 New Tickets!</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="#">
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  }
}

export default adminLayout(AssociationsPage);