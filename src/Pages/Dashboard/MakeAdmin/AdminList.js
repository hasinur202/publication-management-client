import React from 'react';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminList = () => {
    const [allusers, setUserList] = useState({});
    const [listReload, setlistReload] = useState(false);
    let sL = 0;

    useEffect(() => {
        setlistReload(true)
        const url = `https://publication-management-client.herokuapp.com/users`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUserList(data));
            setlistReload(false)
    }, [listReload]);

    // DELETE AN USER
    const handleDeleteAreas = id => {
        setlistReload(false);
        const proceed = window.confirm('Are you sure to change status?');
        if (proceed) {
            const url = `https://publication-management-client.herokuapp.com/content-areas/${id}`;
            fetch(url, {
                method: 'PUT'
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Updated successfully');
                    setlistReload(true);
                }
            });
        }
    }

    return (
        <section id="appointment" className="appointment section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>User List</h2>
                </div>
                <div className="row">
                    <div className="bg-light mb-2" style={{textAlign: 'right'}}>
                        <Link to="add-admin" className="btn btn-primary" style={{marginRight: '5px'}}>Add Admin</Link>
                        <Link to="add-editor" className="btn btn-success">Add Editor</Link>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">SL. No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            allusers.length > 0 && allusers.map(newUser =><tr key={newUser._id}>
                                    <th scope="row">{sL = sL + 1}</th>
                                    <td>{newUser.displayName}</td>
                                    <td>{newUser.email}</td>
                                    <td>
                                        {
                                            newUser.role ? <span>{newUser.role}</span> : <span>user</span>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteAreas(newUser._id)}><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        }
                            <tr>
                                <td colSpan={6}>
                                    {
                                    sL === 0 &&
                                    <Spinner className="text-center" animation="border" variant="danger" />
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AdminList;