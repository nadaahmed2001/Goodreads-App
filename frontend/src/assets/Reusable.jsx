import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

export default function ModalBtn({ title, fields, onSave, category }) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({});
    const [author, setAuthor] = useState([]);
    // const [category, setCategory] = useState([]);
    const [selectedAuth, setSelectedAuth] = useState('Authors')
    const [selectedCat, setSelectedCat] = useState('categories')
    const [error, setError] = useState("");
    // console.log(formData);
    console.log("Categories in ModalBtn:", category);
    useEffect(() => {
        fetch("http://localhost:5000/authors")
            .then((res) => res.json())
            .then((data) => {
                setAuthor(data); // ✅ Ensure `data` is an array
            })
            .catch((err) => {
                console.error("Error fetching authors:", err);
                setAuthor([]); // Fallback to an empty array in case of an error
            });
    }, []);

    // console.log(author);
    // useEffect(() => {
    //     fetch("http://localhost:5000/categories")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setCategory(data); // ✅ Ensure `data` is an array
    //             console.log(category);
    //         })
    //         .catch((err) => {
    //             console.error("Error fetching authors:", err);
    //             setCategory([]); // Fallback to an empty array in case of an error
    //         });
    // }, []);

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
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        // console.log("submitted"); // Debugging log

        // if (title === 'Category') {
        //     axios.post(`http://localhost:5000/category`, { name: formData.name })
        //         .then((response) => {
        //             console.log("Category added:", response.data);
        //             alert("Category added successfully!");
        //         })
        //         .catch((err) => console.log("unable to add category"));
        // }
        // else if (title === 'Book') {
        //     const bookData = {
        //         title: formData.name,
        //         // author: formData.author,   // Use raw ID from formData
        //         // category: formData.category, // Use raw ID from formData
        //         // description: "",
        //         // coverImage: "",
        //         // price: formData.price || 0,
        //         // rating: formData.rating || 0,
        //         // featured: formData.featured || false,
        //         // trending: formData.trending || false,
        //     };
        //     axios.post(`http://localhost:5000/book`, bookData)
        //         .then((response) => {
        //             console.log("Book added:", response.data);
        //             alert("Book added successfully!");
        //         })
        //         .catch((err) => {
        //             console.error("Unable to add book:", err);
        //             alert("Failed to add the book.");
        //         });
        // }
        // else if (title === 'Author') {
        //     axios.post(`http://localhost:5000/author`, {
        //         name: formData.name,
        //         // image: formData.image,
        //         bio: formData.bio,
        //         birthDate: formData.birthDate
        //     })
        //         .then((response) => {
        //             console.log("Author added:", response.data);
        //             alert("Author added successfully!");
        //         })
        //         .catch((err) => console.log("unable to add author"));
        // }
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
