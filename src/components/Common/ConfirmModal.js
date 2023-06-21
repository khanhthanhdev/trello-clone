import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function ConfirmModal(props) {
    const {title, content, show, onAction} = props;

    return (
        <>      
            <Modal show={show} onClose={() => onAction('close')}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{content}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onAction('close')}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onAction('confirm')}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmModal;