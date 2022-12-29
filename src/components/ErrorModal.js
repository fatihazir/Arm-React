import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ErrorModal({ show, body, firstButtonOnPress, firstButtonText, secondButtonText, secondButtonOnPress }) {

    return (
        <>
            <Modal show={show}>
                <Modal.Header style={{ backgroundColor: '#cc3300' }} closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    {secondButtonText ?
                        <Button variant="secondary" onClick={secondButtonOnPress}>
                            {secondButtonText}
                        </Button>
                        : null}
                    <Button variant="danger" style={{ backgroundColor: '#cc3300' }} onClick={firstButtonOnPress}>
                        {firstButtonText ? firstButtonText : 'Okay'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ErrorModal