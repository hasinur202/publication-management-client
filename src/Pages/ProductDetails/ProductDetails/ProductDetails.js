import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const { _id } = useParams();

    useEffect(() => {
        const url = `http://localhost:5000/contents-by-id/${_id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [_id]);
    
    return (
        <>
        <Header></Header>
        <section id="about" className="about">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>{product.content_title}</h2>
                </div>
                <div className="row">
                    <div className="col-lg-8" data-aos="fade-right">
                        {/* <h3 className="text-left">{product.content_title}</h3> */}
                        <img src={product.img} className="img-fluid" alt="" />
                        <h5>Posted {product.date}</h5>
                        <p className="fst-italic text-left">
                            {product.publication_content}
                        </p>
                    </div>
                    <div className="col-lg-4 pt-4 pt-lg-0 content" data-aos="fade-left">
                        <Link to={`/booking/${_id}`}>
                            <button className="btn btn-warning py-2 bx-tada-hover">Order Now</button>
                        </Link>
                        <h5 className="text-left mt-2">{product.content_area}</h5>
                        <ul>
                            <li><i className="text-start bi bi-check-circle"></i>Price: {product.price}</li>
                            <li><i className="text-start bi bi-check-circle"></i>Writer: {product.writer_name}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <Footer></Footer>
        </>
    );
};

export default ProductDetails;