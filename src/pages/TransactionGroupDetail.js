import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { links } from "../assets/lib/Constants";
import adminLayout from "../hoc/adminLayout"
import Apibase from "../assets/lib/Apibase"
import ErrorModal from '../components/ErrorModal';
import Loading from "../components/Loading";

function TransactionGroupDetail() {
    const { state } = useLocation()

    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorModalBodyText, setErrorModalBodyText] = useState("")
    const [showOverlay, setShowOverlay] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [transactions, setTransactions] = useState([])

    const GetTransactionsByGroupId = () => {
        setShowOverlay(true)
        setShowLoading(true)

        Apibase.Get({
            url: links.transactions + "?groupId=" + state.transactionGroupId.toString(),
            successFunction: (data) => {
                setTransactions(data.data)
                setShowLoading(false)
                setShowOverlay(false)
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

    function CloseErrorModal() {
        setShowOverlay(false)
        setShowErrorModal(false)
    }

    useEffect(() => {
        GetTransactionsByGroupId()
    }, [])


    return (
        <>
            <Loading showOverlay={showOverlay} showLoading={showLoading} />
            <ErrorModal show={showErrorModal} body={errorModalBodyText} firstButtonOnPress={CloseErrorModal} />
            <div className="table-container">
                <div className="row">
                    <div className="col">
                        <h5 className="pb-2 mb-0">My Results</h5>
                    </div>
                </div>
                <p style={{ width: '80vw' }}></p>
                <div className="d-flex text-muted">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Associations</th>
                                <th>Support</th>
                                <th>Lift</th>
                                <th>Confidence</th>
                            </tr>
                        </thead>
                        <tbody >
                            {transactions.map((item, index) =>
                                <tr key={index.toString()}
                                >
                                    <td>{item.id}</td>
                                    <td>{item.associations.split(',').map((item, index) => <p key={index}>{item}</p>)}</td>
                                    <td >{item.support}</td>
                                    <td>{item.lift}</td>
                                    <td>{item.confidence}</td>
                                </tr>)}

                        </tbody>
                    </table>
                </div>

            </div>

        </>
    )
}

export default adminLayout(TransactionGroupDetail);