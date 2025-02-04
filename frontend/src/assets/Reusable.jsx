import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

export default function ModalBtn({ title, fields, onSave, category, author }) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({});
    // const [author, setAuthor] = useState([]);
    // const [category, setCategory] = useState([]);
    const [selectedAuth, setSelectedAuth] = useState('Authors')
    const [selectedCat, setSelectedCat] = useState('categories')
    const [error, setError] = useState("");
    // console.log(formData);
    console.log("Categories in ModalBtn:", category);
    console.log("Author in ModalBtn:", author);

    const handleShow = () => {
        setShow(true);
        setFormData({});
        setError("");
    };

    const handleClose = () => {
        setShow(false)
        setSelectedAuth('Authors')
        setSelectedCat('Category')
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleSave = () => {
        if (fields.some((field) => !formData[field.name])) {
            //some method immediately returns true if any field is empty
            setError("Please fill all fields");
            return;
        }
        console.log(formData);

        setError("");
        onSave(formData);
        handleClose();
        setSelectedAuth('Authors')
        setSelectedCat('Category')
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    <Form onSubmit={handleSubmit}>

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
                        {error && <p className="text-danger">{error}</p>}
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
