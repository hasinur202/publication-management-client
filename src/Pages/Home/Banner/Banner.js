import React from 'react';
import { Carousel } from 'react-bootstrap';
import banner3 from '../../../images/banner/banner1.jpg';
import banner1 from '../../../images/banner/banner2.jpg';
import banner2 from '../../../images/banner/banner3.jpg';
import banner4 from '../../../images/banner/banner4.jpg';
import './Banner.css'

const Banner = () => {
    return (     
        <>       
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block banner w-100 h-50"
                    src={banner3}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block banner w-100 h-75"
                    src={banner1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block banner w-100 h-50"
                    src={banner2}
                    alt="Second slide"
                />
            </Carousel.Item>
        </Carousel>
        <section id="cta" className="cta">
            <div className="container" data-aos="zoom-in">
                <div className="text-center">
                <h3>Safety Is Our Top Priority</h3>
                <p> We're welcoming students back to campus with a focus on health and safety—in classrooms, residence halls, and other campus spaces. Together we will reduce the spread of COVID-19.</p>
                {/* <a className="cta-btn scrollto" href="#appointment">Make an Make an Appointment</a> */}
                </div>
            </div>
        </section>
        <div className="section-title">
                {/* <h2><span className="text-success">WHY</span> CHOOSE US</h2> */}
                <img
                    className="d-block banner w-100 h-30"
                    src={banner4}
                    alt="Second slide"
                />
            </div>
        </>
    );
};

export default Banner;