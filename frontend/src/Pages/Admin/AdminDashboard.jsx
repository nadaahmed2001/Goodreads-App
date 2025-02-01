import React from "react";
import Table from "react-bootstrap/Table";
import Sidebar from "./Sidebar";

export default function AdminDashboard() {
    return (
        <div className="d-flex">
            <Sidebar />

            <div className="flex-grow-1 p-4">
                <h2>Admin Dashboard</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Admin</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Moderator</td>
                            <td>@fat</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
