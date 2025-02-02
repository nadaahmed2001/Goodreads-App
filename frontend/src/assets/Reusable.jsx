import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function ModalBtn({ title, fields, onSave }) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");

    const handleShow = () => {
        setShow(true);
        setFormData({});
        setError("");
    };

    const handleClose = () => setShow(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value
        });

    };

    const handleSave = () => {
        if (fields.some(field => !formData[field.name])) {
            //some method immediately returns true if any field is empty
            setError("Please fill all fields");
            return;
        }
        console.log(formData);

        setError("");
        onSave(formData);
        handleClose();
    };

    return (
        <>
            <Button className="fs-5" variant="dark" onClick={handleShow}>
                Add {title}
            </Button>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {fields.map((field, index) => (
                            <Form.Group className="mb-3" key={index}>
                                <Form.Label>{field.label}</Form.Label>
                                <Form.Control
                                    type={field.type}
                                    name={field.name}
                                    onChange={handleChange}
                                    autoFocus={index === 0}
                                    accept={field.type === "file" ? "image/*" : undefined}
                                />
                            </Form.Group>
                        ))}
                    </Form>
                    {error && <p className="text-danger">{error}</p>}
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
