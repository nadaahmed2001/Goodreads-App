import React from 'react'
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import ModalBtn from '../../assets/Reusable';

export default function Categories() {

    // const handleSaveCategory = () => {

    // }
    return (
        <div className='d-flex'>
            <Sidebar />
            <div className="flex-grow-1 p-5 ">
                <div className='d-flex justify-content-between'>
                    <h1>Manage Categories</h1>
                    {/* <Button variant="dark">Add Category</Button> */}
                    <ModalBtn
                        title="User"
                        fields={[
                            { name: "name", label: "Category", type: "text" },
                        ]}
                        onSave={(data) => console.log("Saving User:", data)}
                    />
                </div>
                <Table striped bordered hover>
                    <thead >
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Admin</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Moderator</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
