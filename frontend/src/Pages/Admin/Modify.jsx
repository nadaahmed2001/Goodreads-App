import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Dropdown from "react-bootstrap/Dropdown";

function Modify({ fields, handleUpdate, initialData, category, author }) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedAuth, setSelectedAuth] = useState('Authors')
    const [selectedCat, setSelectedCat] = useState('categories')

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
        // e.preventDefault()
        console.log("Form Data:", formData);
        handleUpdate(formData); // Pass updated form data only
        handleClose();
    };

    return (
        <>
            <Button variant="outline-dark me-2" onClick={handleShow}>✏️</Button >

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modify Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {fields.map((field, index) => (
                            <Form.Group className="mb-3" key={index}>
                                <Form.Label>{field.label}</Form.Label>
                                {field.type === "dropdown" && field.name === 'author' ? (
                                    <Dropdown className="d-flex">
                                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                            {selectedAuth}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {author.map((auth) => (
                                                <Dropdown.Item key={auth._id} onClick={() => {
                                                    setSelectedAuth(auth.name)
                                                    setFormData({ ...formData, author: auth._id });
                                                }}>
                                                    {auth.name}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                ) : field.type === "dropdown" && field.name === 'category' ?
                                    <Dropdown className="d-flex">
                                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                            {selectedCat}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {category.map((cat) => (
                                                <Dropdown.Item key={cat._id} onClick={() => { setSelectedCat(cat.name); setFormData({ ...formData, category: cat._id }); }}>
                                                    {cat.name}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown> :
                                    (
                                        <Form.Control
                                            type={field.type}
                                            name={field.name}
                                            onChange={handleChange}
                                            autoFocus={index === 0}
                                            accept={field.type === "file" ? "image/*" : undefined}
                                        />
                                    )}
                            </Form.Group>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Modify;
