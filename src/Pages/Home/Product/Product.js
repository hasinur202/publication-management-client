import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    // const {product} = props;
    const { _id, content_title, date, price, img, content_area, writer_name } = product;
    return (
        <>
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="member" data-aos="fade-up" data-aos-delay="300">
                <div className="member-img">
                    <img src={img} className="img-fluid serviceImg" alt="" />
                    <div className="social">
                        <Link to={`/booking/${_id}`}>
                            <button className="btn btn-warning py-2 bx-tada-hover">Buy Now <i className="fas fa-suitcase-rolling"></i></button>
                        </Link>
                    </div>
                </div>
                <div className="member-info">
                    <h3 className="title">{content_title}</h3>
                    <h6 className="description mt-2">{content_area}</h6>
                    <div className="d-flex p-3 bg-light border-bottom Price">
                        <div className="col-lg-6 text-start">
                            <p className='m-0'>Price: {price} <br/>Posted {date} <br/>Writer- {writer_name}</p>
                        </div>
                    </div>
                    <Link to={`/product-details/${_id}`}>
                        <button className="btn btn-success mt-3">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    </>
    );
};

export default Product;