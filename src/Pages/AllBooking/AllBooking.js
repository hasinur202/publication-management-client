import React from 'react';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

const AllBooking = () => {
    const [bookings, setBookings] = useState({});
    let sL = 0;

    useEffect(() => {
        const url = 'https://publication-management-client.herokuapp.com/all-bookings';
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data));
    }, []);

    // Approve booking
    const handleApproveBooking = id => {
    const proceed = window.confirm('Are you sure, you want to approve?');
    if (proceed) {
        const url = `https://publication-management-client.herokuapp.com/approve-booking/${id}`;
        fetch(url, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Approved successfully');
                    const remainingBookings = bookings.filter(book => book._id !== id);
                    setBookings(remainingBookings);
                }
            });
        }
    }

// Reject Booking AN USER
    const handleRejectBooking = id => {
    const proceed = window.confirm('Are you sure, you want to reject?');
    if (proceed) {
        const url = `https://publication-management-client.herokuapp.com/reject-booking/${id}`;
        fetch(url, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Rejected successfully');
                    const remainBookings = bookings.filter(book => book._id !== id);
                    setBookings(remainBookings);
                }
            });
        }
    }

    // DELETE AN USER
    const handleDeleteBooking = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `https://publication-management-client.herokuapp.com/bookings/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert('deleted successfully');
                    const remainingBookings = bookings.filter(book => book._id !== id);
                    setBookings(remainingBookings);
                }
            });
        }
    }

    return (
        <section id="appointment" className="appointment section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Manage Booking</h2>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">SL. No.</th>
                                <th scope="col">Booking Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            bookings.length > 0 ? bookings.map(book => <tr key={book._id}>
                                    <th scope="row">{sL = sL + 1}</th>
                                    <td>{book.tour_id}</td>
                                    <td>{book.email}</td>
                                    <td>{book.phone}</td>
                                    <td>
                                    { book.status === 2 ? <span>Pending</span> : <span>Approved</span>}
                                    </td>
                                    <td>
                                        {
                                            book.status === 2 ? <button className="mr-2" onClick={() => handleApproveBooking(book._id)}>Approve</button> : ''
                                        }
                                        {
                                            book.status === 2 ? <button onClick={() => handleRejectBooking(book._id)}>Reject</button> : ''
                                        }
                                        <button onClick={() => handleDeleteBooking(book._id)}><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                            :
                            <Spinner className="text-center" animation="border" variant="danger" />
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AllBooking;