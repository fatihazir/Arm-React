import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { links } from "../assets/lib/Constants";
import adminLayout from "../hoc/adminLayout"
import Apibase from "../assets/lib/Apibase"
import ErrorModal from '../components/ErrorModal';
import Loading from "../components/Loading";
import SuccessModal from "../components/SuccessModal";

function TransactionGroupDetail() {
    const { state } = useLocation()

    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorModalBodyText, setErrorModalBodyText] = useState("")
    const [showOverlay, setShowOverlay] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [showEditAliasInput, setShowEditAliasInput] = useState(false)
    const [aliasInputText, setAliasInputText] = useState(state.group.alias)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successModalText, setSuccessModalText] = useState("")
    const [showWarningModal, setShowWarningModal] = useState(false)
    const [isDeleteMode, setIsDeleteMode] = useState(false)

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

    function OnEditIconPressed() {
        setShowEditAliasInput(true)
    }

    function OnDeleteIconPressed() {
        setShowOverlay(true)
        setErrorModalBodyText("Are you sure to delete " + aliasInputText + " transaction group?")
        setShowWarningModal(true)
    }

    function HandleAliasInputText(e) {
        setAliasInputText(e.target.value)
    }

    function OnInputSaveButtonPressed() {
        setShowOverlay(true)
        setShowLoading(true)

        let body = {
            "Id": state.group.id,
            "UserId": state.group.userId,
            "Alias": aliasInputText,
            "CreatedAt": state.group.createdAt
        }

        Apibase.Post({
            url: links.updateTransactionGroup,
            body,
            successFunction: (data) => {
                setSuccessModalText(data.message)
                setShowLoading(false)
                setShowSuccessModal(true)
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

    function DeleteGroup() {
        setShowWarningModal(false)
        setShowLoading(true)

        let body = {
            "Id": state.group.id,
            "UserId": state.group.userId,
            "Alias": aliasInputText,
            "CreatedAt": state.group.createdAt
        }

        Apibase.Post({
            url: links.deleteTransactionGroup,
            body,
            successFunction: (data) => {
                setIsDeleteMode(true)
                setSuccessModalText(data.message)
                setShowLoading(false)
                setShowSuccessModal(true)
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

    function OnSuccessModalFirstButtonPressed() {
        if (isDeleteMode) {
            window.location.href = '/'
        }
        setShowSuccessModal(false)
        setShowOverlay(false)
        state.group.alias = aliasInputText
    }

    useEffect(() => {
        GetTransactionsByGroupId()
    }, [])


    return (
        <>
            <Loading showOverlay={showOverlay} showLoading={showLoading} />
            <ErrorModal
                show={showErrorModal}
                body={errorModalBodyText}
                firstButtonOnPress={CloseErrorModal}
                firstButtonText={"Close"}
            />
            <ErrorModal
                show={showWarningModal}
                title="Warning"
                body={errorModalBodyText}
                firstButtonOnPress={CloseErrorModal}
                firstButtonText={"Close"}
                secondButtonText={"Delete"}
                secondButtonOnPress={DeleteGroup}
            />
            <SuccessModal show={showSuccessModal} body={successModalText} firstButtonOnPress={OnSuccessModalFirstButtonPressed} />
            <div className="table-container">
                <div className="row">
                    <div className="col">
                        <h5 className="pb-2 mb-0">My Results for {state.group.alias}</h5>
                    </div>
                    <div className="col text-right">
                        <button onClick={OnEditIconPressed} className="btn btn-default low-height-btn">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </button>
                        <button onClick={OnDeleteIconPressed} style={{ marginLeft: 12 }} className="btn btn-default low-height-btn">
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                {showEditAliasInput &&
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col">
                            <div className="form-outline mb-4 mt-4">
                                <input onChange={HandleAliasInputText} type="email" id="form3Example3" className="form-control form-control-lg"
                                    value={aliasInputText} />
                            </div>
                            <button onClick={OnInputSaveButtonPressed} type="button" class="btn btn-primary btn-md">Save</button>
                        </div>
                    </div>}
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