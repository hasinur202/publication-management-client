import React from 'react';
import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';


const MyOrder = () => {
    const { user } = useAuth();
    const [bookings, setOrders] = useState({});
    let sL = 0;

    useEffect(() => {
        const url = `https://publication-management-client.herokuapp.com/orders/${user.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [user.email]);

     // DELETE AN USER
     const handleDeleteBooking = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `https://publication-management-client.herokuapp.com/order/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remainingBookings = bookings.filter(book => book._id !== id);
                        setOrders(remainingBookings);
                    }
                });
        }
    }

    return (
        <section id="appointment" className="appointment section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>My Order List</h2>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">SL. No.</th>
                                <th scope="col">Content Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Pay Status</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            bookings.length > 0 && bookings.map(book => <tr>
                                    <th scope="row">{sL = sL + 1}</th>
                                    <td>{book.content_title}</td>
                                    <td>{book.price}</td>
                                    <td>{book.phone}</td>
                                    <td>{book.pay_status === 0 ? 'Not Paid' : 'Paid'}</td>
                                    <td>
                                    { book.status === 2 ? <span>Pending</span> : (book.status === 1 ? <span>Approved</span> : <span>Rejected</span>)}
                                    </td>
                                    <td>
                                        {
                                            book.status === 2 ? <button onClick={() => handleDeleteBooking(book._id)}><i className="fas fa-trash"></i></button> : 'N/A'
                                        }
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default MyOrder;