import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Modify({ fields, handleUpdate, initialData }) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(initialData || {}); // Initialize formData with author details
    }, [initialData]); // Runs when `initialData` changes

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        console.log("Form Data:", formData);
        handleUpdate(formData); // Pass updated form data only
        handleClose();
    };

    return (
        <>
            <button onClick={handleShow}>✏️</button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modify Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {fields.map((field, id) => (
                            <Form.Group className="mb-3" key={id}>
                                <Form.Label>{field.label}</Form.Label>
                                <Form.Control
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="button" variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Modify;
