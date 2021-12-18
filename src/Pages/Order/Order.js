import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';

const Order = () => {
    const [product, setProduct] = useState({});
    const { _id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuth();
    const history = useHistory();

    useEffect(() => {
        const url = `https://publication-management-client.herokuapp.com/contents-by-id/${_id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [_id]);

    const onSubmit = data => {
        data.product_id = _id
        data.content_title = product.content_title
        data.price = product.price
        data.email = user.email
        data.status = 2
        data.pay_status = 0

        fetch('https://publication-management-client.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Order processed Successfully');
                    history.push('/home');
                    reset();
                }
            })
    };
    return (
        <>
        <Header></Header>
        <section id="appointment" className="appointment section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Add Necessary Info for Booking</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="php-email-form" data-aos="fade-up" data-aos-delay="100">                    
                    <div className="row">
                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <input readOnly defaultValue={product.content_title} {...register("content_title", { required: true })} type="text" className="form-control" placeholder="Image Url" required />
                        </div>
                        <div className="col-md-6 form-group">
                            <input readOnly defaultValue={user.displayName} {...register("name")} type="text" className="form-control" required />
                        </div>
                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <input readOnly defaultValue={user.email} {...register("email", { required: true })} type="text" className="form-control" placeholder="Image Url" required />
                        </div>
                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <input defaultValue="" {...register("address")} type="text" className="form-control" placeholder="Address" required />
                        </div>
                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <input defaultValue="" {...register("city")} type="text" className="form-control" placeholder="City" required />
                        </div>
                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <input defaultValue="" {...register("phone")} type="number" className="form-control" placeholder="Phone Number" required />
                        </div>
                    </div>
                    <div className="my-3">
                        <div className="loading">Loading</div>
                        { errors.length > 0 &&
                            errors.map(error => <div className="error-message">{error}</div> )
                        }
                        <div className="sent-message">Your request has been sent successfully. Thank you!</div>
                    </div>
                    <div className="text-center"><button className="btn-primary px-3 py-2" type="submit">Order Now</button></div>
                </form>
            </div>
        </section>
        <Footer></Footer>
        </>
    );
};

export default Order;