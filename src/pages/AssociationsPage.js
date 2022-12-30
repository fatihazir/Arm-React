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
      showLoading: false,
      associations: []
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
          showLoading: false,
          associations: data.data
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
      <div className="table-container">
        <div className="row">
          <div className="col">
            <h5 className="pb-2 mb-0">My Assocination Results</h5>
          </div>
          <div className="col text-right">
            <button onClick={this.GetTransactionGroups} className="btn btn-default low-height-btn">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <p style={{ width: '75vw' }}></p>
        <div className="d-flex text-muted">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Alias</th>
                <th>Result count</th>
                <th>Created at</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.associations.map((item, index) =>
                <tr key={index.toString()}>
                  <td>{item.id}</td>
                  <td>{item.alias}</td>
                  <td>{item.resultCount}</td>
                  <td>{item.createdAt.replace('T', ' - ')}</td>
                  <td><i class="fa fa-arrow-right" aria-hidden="true"></i></td>
                </tr>)}

            </tbody>
          </table>
        </div>

      </div>
    </>
  }
}

export default adminLayout(AssociationsPage);