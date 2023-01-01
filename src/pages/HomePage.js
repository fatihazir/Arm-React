import React, { useEffect, useState } from "react";
import { links } from "../assets/lib/Constants";
import adminLayout from "../hoc/adminLayout"
import Apibase from "../assets/lib/Apibase"
import ErrorModal from '../components/ErrorModal';
import Loading from "../components/Loading";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function HomePage() {

  const navigate = useNavigate();

  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorModalBodyText, setErrorModalBodyText] = useState("")
  const [showOverlay, setShowOverlay] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [associations, setAssociations] = useState([])

  const user = useSelector((state) => state.user.value)
  console.log("user : ", user);

  const GetTransactionGroups = () => {
    setShowOverlay(true)
    setShowLoading(true)

    Apibase.Get({
      url: links.transactionGroups + "?userId=" + "2",
      successFunction: (data) => {
        setShowOverlay(false)
        setShowLoading(false)
        setAssociations(data.data)
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

  const OnTransactionGroupClick = (transactionGroupId) => {
    navigate('/transaction-group-detail', { state: { transactionGroupId } })
  }

  function CloseErrorModal() {
    setShowOverlay(false)
    setShowErrorModal(false)
  }

  useEffect(() => {
    GetTransactionGroups()
  }, [])

  return (
    <>
      <Loading showOverlay={showOverlay} showLoading={showLoading} />
      <ErrorModal show={showErrorModal} body={errorModalBodyText} firstButtonOnPress={CloseErrorModal} />
      <div className="table-container">
        <div className="row">
          <div className="col">
            <h5 className="pb-2 mb-0">My Assocination Results</h5>
          </div>
          <div className="col text-right">
            <button onClick={GetTransactionGroups} className="btn btn-default low-height-btn">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <p style={{ width: '80vw' }}></p>
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
            <tbody >
              {associations.map((item, index) =>
                <tr key={index.toString()}
                  onClick={() => OnTransactionGroupClick(item.id)}
                >
                  <td>{item.id}</td>
                  <td>{item.alias}</td>
                  <td >{item.resultCount}</td>
                  <td>{item.createdAt.replace('T', ' - ')}</td>
                  <td><i class="fa fa-arrow-right" aria-hidden="true"></i></td>
                </tr>)}

            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default adminLayout(HomePage);
