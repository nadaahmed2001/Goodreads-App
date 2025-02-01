import React from 'react'
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import ModalBtn from '../../assets/Reusable';

export default function Users() {
    return (
        <div className='d-flex'>
            <Sidebar />
            <div className="flex-grow-1 p-5">
                <div className='d-flex justify-content-between'>
                    <h1>Manage Books</h1>
                    {/* <Button variant="dark">Add Book</Button> */}
                    {<ModalBtn />}
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>CategoryId</th>
                            <th>AuthorId</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Admin</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
