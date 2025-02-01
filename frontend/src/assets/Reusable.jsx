import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// Admin Modal Button
export default function ModalBtn() {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }
    return (
        <>
            <Button className='fs-5' variant="dark" onClick={handleShow}>
                Add +
            </Button>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Add Category</Form.Label>
                            <Form.Control
                                type="email"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
