import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Product from '../Product/Product';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('https://publication-management-client.herokuapp.com/get-approved-conents')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])

    return (
        <>
        <section id="services" className="doctors section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                <h2>Latest research projects, publications, and talks</h2>
                <p>Choose your necessary publications and buy easily.</p>
                </div>
                {/* products.slice(0, 6).map */}
                <div className="row">
                    {
                        products.length > 0 ? products.slice(0, 6).map(product => <Product
                            key={product._id}
                            product={product}
                        ></Product>)
                        :
                        <div className="text-center">
                            <Spinner animation="border" variant="danger" />
                        </div>
                    }
                </div>
            </div>
        </section>
        </>
    );
};

export default Products;