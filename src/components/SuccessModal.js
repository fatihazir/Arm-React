import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SuccessModal({ show, body, firstButtonOnPress, firstButtonText, secondButtonText, secondButtonOnPress }) {

    return (
        <>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    {secondButtonText ?
                        <Button variant="secondary" onClick={secondButtonOnPress}>
                            {secondButtonText}
                        </Button>
                        : null}
                    <Button variant="primary" onClick={firstButtonOnPress}>
                        {firstButtonText ? firstButtonText : 'Okay'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SuccessModal