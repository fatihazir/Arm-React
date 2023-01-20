import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { links } from "../assets/lib/Constants";
import adminLayout from "../hoc/adminLayout"
import Apibase from "../assets/lib/Apibase"
import ErrorModal from '../components/ErrorModal';
import Loading from "../components/Loading";
import SuccessModal from "../components/SuccessModal";
import { useSelector } from 'react-redux';
import {
    selectUser
} from '../features/user/userSlice';

let resultCount = 0

function TransactionGroupDetail() {
    const { state } = useLocation()
    const user = useSelector(selectUser);

    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorModalBodyText, setErrorModalBodyText] = useState("")
    const [showOverlay, setShowOverlay] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [showEditAliasInput, setShowEditAliasInput] = useState(false)
    const [showFilterInput, setShowFilterInput] = useState(false)
    const [aliasInputText, setAliasInputText] = useState(state.group.alias)
    const [filterText, setFilterText] = useState()
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successModalText, setSuccessModalText] = useState("")
    const [showWarningModal, setShowWarningModal] = useState(false)
    const [isDeleteMode, setIsDeleteMode] = useState(false)
    const [associationOrderType, setAssociationOrderType] = useState(null)

    const GetTransactionsByGroupId = () => {
        setShowOverlay(true)
        setShowLoading(true)

        Apibase.Get({
            url: links.transactions + "?groupId=" + state.transactionGroupId.toString(),
            bearerToken: user.token,
            successFunction: (data) => {
                setTransactions(data.data)
                resultCount = data.data.length
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

    function CloseWarningModal() {
        setShowOverlay(false)
        setShowWarningModal(false)
    }

    function OnFilterIconPressed() {
        setShowFilterInput(!showFilterInput)
    }

    function OnEditIconPressed() {
        setShowEditAliasInput(!showEditAliasInput)
    }

    function OnDeleteIconPressed() {
        setShowOverlay(true)
        setErrorModalBodyText("Are you sure to delete " + aliasInputText + " transaction group?")
        setShowWarningModal(true)
    }

    function HandleAliasInputText(e) {
        setAliasInputText(e.target.value)
    }

    function HandleFilterInputText(e) {
        setFilterText(e.target.value)
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
            bearerToken: user.token,
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
            bearerToken: user.token,
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

    function DeleteTransaction(id) {
        setShowOverlay(true)
        setShowLoading(true)

        let body = {
            "id": id,
            "transactionGroupId": 0,
            "associations": "string",
            "support": 0,
            "confidence": 0,
            "lift": 0
        }
        Apibase.Post({
            url: links.deleteTransaction,
            body,
            bearerToken: user.token,
            successFunction: (data) => {
                GetTransactionsByGroupId();
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

    function HandleData() {
        let handledData = transactions.slice()
        if (filterText && filterText.length > 1) {
            handledData = handledData.filter(item =>
                item.associations.toLowerCase().includes(filterText.toLowerCase())
            )
        }

        if (associationOrderType !== null) {
            handledData = handledData.filter(item =>
                item.isPositive == associationOrderType)
        }

        resultCount = handledData.length
        return handledData
    }

    function SetShowAllAssociations() {
        setAssociationOrderType(null)
    }

    function SetShowStrongAssociations() {
        setAssociationOrderType(1)
    }

    function SetShowLeastAssociations() {
        setAssociationOrderType(0)
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
                firstButtonOnPress={CloseWarningModal}
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
                        <button onClick={OnFilterIconPressed} className="btn btn-default low-height-btn">
                            <i class="fa fa-filter" aria-hidden="true"></i>
                        </button>
                        <button onClick={OnEditIconPressed} style={{ marginLeft: 12 }} className="btn btn-default low-height-btn">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </button>
                        <button onClick={OnDeleteIconPressed} style={{ marginLeft: 12 }} className="btn btn-default low-height-btn">
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <ul class="nav">
                    <li class="nav-item">
                        <button onClick={SetShowAllAssociations} type="button" class={associationOrderType == null ?
                            "btn btn-sm btn-primary" : "btn btn-sm btn-secondary"}>Show all associations</button>
                    </li>
                    <li class="nav-item flex px-2">
                        <button onClick={SetShowStrongAssociations} type="button" class={associationOrderType == 1 ?
                            "btn btn-sm btn-primary" : "btn btn-sm btn-secondary"}>Show the most strong associations</button>
                    </li>
                    <li class="nav-item flex px-2">
                        <button onClick={SetShowLeastAssociations} type="button" class={associationOrderType == 0 ?
                            "btn btn-sm btn-primary" : "btn btn-sm btn-secondary"}>Show the least strong associations</button>
                    </li>
                </ul>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <h2 >Result count: {resultCount}</h2>
                </div>

                {showEditAliasInput &&
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col">
                            <div className="form-outline mb-4 mt-4">
                                <label className="form-label" htmlFor="form3Example3">Group Name</label>
                                <input onChange={HandleAliasInputText} type="text" id="form3Example3" className="form-control form-control-lg"
                                    value={aliasInputText} autoFocus />
                            </div>
                            <button onClick={OnInputSaveButtonPressed} type="button" class="btn btn-primary btn-md">Save</button>
                        </div>
                    </div>}
                {showFilterInput &&
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col">
                            <div className="form-outline mb-4 mt-4">
                                <label className="form-label" htmlFor="form3Example3">Filter text</label>
                                <input onChange={HandleFilterInputText} type="text" id="form3Example3" className="form-control form-control-lg"
                                    value={filterText} autoFocus />
                            </div>
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody >
                            {HandleData().map((item, index) =>
                                <tr key={index.toString()}>
                                    <td>{item.id}</td>
                                    <td>{item.associations.split(',').map((item, index) => <p key={index}>{item}</p>)}</td>
                                    <td >{item.support}</td>
                                    <td>{item.lift}</td>
                                    <td>{item.confidence}</td>
                                    <td><button type="button" class="btn btn-outline-danger" onClick={() => DeleteTransaction(item.id)}>Delete</button></td>
                                </tr>)}

                        </tbody>
                    </table>
                </div>

            </div>

        </>
    )
}

export default adminLayout(TransactionGroupDetail);