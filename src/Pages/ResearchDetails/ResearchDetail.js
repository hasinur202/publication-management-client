import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';

const ResearchDetail = () => {
    const [content, setContent] = useState({});
    const { _id } = useParams();

    useEffect(() => {
        const url = `https://publication-management-client.herokuapp.com/content-area-details/${_id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setContent(data));
    }, [_id]);

    return (
        <>
        <Header></Header>
        <section id="about" className="about">
            <div className="container" data-aos="fade-up">
                {/* <div className="section-title">
                    <h2>Content Area Details</h2>
                </div> */}
                <div className="row">
                    <div className="col-lg-3" data-aos="fade-right">
                        <img src={content.img} className="img-fluid" height={200} width={200} alt="" />
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0 content" data-aos="fade-left">
                        {/* <h3 className="text-left">Description</h3> */}
                        {/* <Link to={`/booking/${_id}`}>
                            <button className="btn btn-warning py-2 bx-tada-hover">Order {content.name}</button>
                        </Link> */}
                        {/* <ul>
                            <li><i className="text-left bi bi-check-circle"></i>Price: {content.price}</li>
                        </ul> */}
                        <h3 className="text-left">{content.name}</h3>
                        <hr />
                        <p className="text-justify">
                            {content.description}
                        </p>
                    </div>
                    <div className="col-lg-3" data-aos="fade-right">
                        <br />
                        <Link to={`/content-submission/${_id}`}>
                            <button className="btn btn-warning py-2 bx-tada-hover">Submit Your Content For Publication</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        <Footer></Footer>
        </>
    );
};

export default ResearchDetail;