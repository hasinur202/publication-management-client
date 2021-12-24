import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51K9BvXEotpyZeMoTeTIeZsyZyB70gYWRxyNFfEQlkOdrNoPu2yJCFdnjkfWe0OqOpeDoIpOQScPxm8XQDngsm5c200z5mbx7X7');

const Pay = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        const url = `http://localhost:5000/pay-order/${orderId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setOrder(data));
    }, [orderId]);

    return (
        <section id="appointment" className="appointment section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Payment Here</h2>
                </div>
                <div className='col-md-12'>
                    <div className='col-md-8 m-auto'>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Please Pay for- <br/>{order.content_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">${order.price}</h6>
                                { order.price && <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        order={order}
                                    ></CheckoutForm>
                                </Elements>}
                                <p className="card-text">{order.name}<br/>
                                {order.email}<br/>
                                {order.phone}<br/>
                                {order.address}</p>
                                {/* <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pay;