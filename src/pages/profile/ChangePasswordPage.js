import React, { useState } from "react";
import "../../assets/css/profile.css"
import userProfileLayout from "../../hoc/userProfileLayout";
import Apibase from "../../assets/lib/Apibase"
import { links } from "../../assets/lib/Constants";
import ErrorModal from './../../components/ErrorModal';
import SuccessModal from "./../../components/SuccessModal";
import Loading from "../../components/Loading";
import { useSelector } from 'react-redux';
import {
    selectUser
} from '../../features/user/userSlice';

function ProfilePage() {
    const user = useSelector(selectUser);

    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [newPasswordAgain, setNewPasswordAgain] = useState()
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorModalBodyText, setErrorModalBodyText] = useState("")
    const [showOverlay, setShowOverlay] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successModalText, setSuccessModalText] = useState("")

    const ChangePassword = () => {
        if (newPassword !== newPasswordAgain) {
            setErrorModalBodyText("New passwords do not match.")
            setShowOverlay(true)
            setShowErrorModal(true)
            return
        }

        setShowOverlay(true)
        setShowLoading(true)

        let body = {
            "Email": user.email,
            "OldPassword": currentPassword,
            "NewPassword": newPassword
        }

        Apibase.Post({
            url: links.changePassword,
            body,
            bearerToken: user.token,
            successFunction: (data) => {
                setSuccessModalText(data.message)
                setShowLoading(false)
                setShowSuccessModal(true)
            },
            errorFunction: (data) => {
                console.log("err : ", data);
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

    const CloseErrorModal = () => {
        setShowErrorModal(false)
        setShowOverlay(false)
    }

    function OnSuccessModalFirstButtonPressed() {
        setShowSuccessModal(false)
        setShowOverlay(false)
    }

    return <>
        <Loading showOverlay={showOverlay} showLoading={showLoading} />
        <ErrorModal show={showErrorModal} body={errorModalBodyText} firstButtonOnPress={CloseErrorModal} />
        <SuccessModal show={showSuccessModal} body={successModalText} firstButtonOnPress={OnSuccessModalFirstButtonPressed} />
        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h6 className="border-bottom pb-2 mb-0 mb-3">Change Password</h6>

            <div className="row">
                <div className="col-4">
                    <p>Your Password must contain</p>
                    <p> <i className="fa fa-check"></i> At least 8 characters.</p>
                </div>
                <div className="col-8">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Current Password</label>
                            <div className="input-group mb-3">
                                <input onChange={(e) => setCurrentPassword(e.target.value)} type="password" className="form-control" placeholder="Current Password" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <span className="input-group-text" id="basic-addon2"><i className="fa fa-key"></i></span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">New Password</label>
                            <div className="input-group mb-3">
                                <input onChange={(e) => setNewPassword(e.target.value)} type="password" className="form-control" placeholder="New Password" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <span className="input-group-text" id="basic-addon2"><i className="fa fa-key"></i></span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Confirm New Password</label>
                            <div className="input-group mb-3">
                                <input onChange={(e) => setNewPasswordAgain(e.target.value)} type="password" className="form-control" placeholder="Confirm New Password" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <span className="input-group-text" id="basic-addon2"><i className="fa fa-key"></i></span>
                            </div>
                        </div>
                        <hr />
                    </form>

                    <button onClick={() => ChangePassword()} className="btn btn-primary">Change password</button>
                </div>
            </div>
        </div>

    </>

}

export default userProfileLayout(ProfilePage);