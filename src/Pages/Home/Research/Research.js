import React, { useEffect, useState } from 'react';
// import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Research = () => {
    const [areas, setContentAreas] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/content-areas')
            .then(res => res.json())
            .then(data => setContentAreas(data));
    }, []);

    return (
        <section id="areas" className="services services">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Publication Content Areas</h2>
                    <p>Submit your contents of publication under these content areas.</p>
                </div>
                <div className="row">
                {
                    areas.length > 0 && areas.filter(item => parseInt(item.status) === 1).map(content => 
                        <div key={content._id} className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="100">
                            <div className="">
                                <img src={content.img} alt='icon' />
                            </div>
                            <h4 className="title"><Link to={`/research-details/${content._id}`}>{content.name}</Link></h4>
                            <Link to={`/research-details/${content._id}`} className='btn btn-info'>Apply</Link>
                            {/* <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p> */}
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default Research;