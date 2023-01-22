import React, { useState, useEffect } from "react";
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
    const [email, setEmail] = useState(user.email)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorModalBodyText, setErrorModalBodyText] = useState("")
    const [showOverlay, setShowOverlay] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successModalText, setSuccessModalText] = useState("")

    const Update = () => {
        setShowOverlay(true)
        setShowLoading(true)

        let body = {
            "Id": user.id,
            "FirstName": firstName,
            "LastName": lastName,
            "PhotoUrl": photoUrl
        }

        Apibase.Post({
            url: links.updateProfile,
            body,
            bearerToken: '',
            successFunction: (data) => {
                setSuccessModalText(data.message + '! ' + 'You need to re login to see the changes.')
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
            <h6 className="border-bottom pb-2 mb-0 mb-3">Personal Info</h6>
            <form>

                <div className="col">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <div className="input-group mb-3">
                        <input disabled value={email} type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <span className="input-group-text" id="basic-addon2">@</span>
                    </div>
                </div>

                <div className="col">
                    <label htmlFor="exampleInputEmail1" className="form-label">Photo url</label>
                    <div className="input-group mb-3">
                        <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <span className="input-group-text" id="basic-addon2">@</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                        <div className="input-group mb-3">
                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" placeholder="First Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                        </div>
                    </div>
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                        <div className="input-group mb-3">
                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" placeholder="Last Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                        </div>
                    </div>
                </div>

            </form>
            <button onClick={() => Update()} className="btn btn-primary">Update</button>
        </div>

    </>
}

export default userProfileLayout(ProfilePage);