import React from 'react';
import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import './DashboardHome.css'

const DashboardHome = () => {
    const { admin } = useAuth();
    const [dashboard, setDashboard] = useState({});

    useEffect(() => {
        const url = `http://localhost:5000/dashboard`;
        fetch(url)
            .then(res => res.json())
            .then(data => setDashboard(data));
    }, []);

    return (
        <section id="appointment" className="appointment section-bg">
            <div className="container" data-aos="fade-up">
                <div>
                    <h2>Welcome to Publication Management Dashboard</h2>
                </div>
                { admin &&
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="card-box bg-blue">
                                <div className="inner">
                                    <h3> {dashboard.orderCount} </h3>
                                    <p> Order </p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                                </div>
                                {/* <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a> */}
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="card-box bg-orange">
                                <div className="inner">
                                    <h3> {dashboard.totalUser} </h3>
                                    <p> Total User </p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                                </div>
                                {/* <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a> */}
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="card-box bg-green">
                                <div className="inner">
                                    <h3> {dashboard.contentArea} </h3>
                                    <p> Total Content Area </p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-money" aria-hidden="true"></i>
                                </div>
                                {/* <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a> */}
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="card-box bg-red">
                                <div className="inner">
                                    <h3> {dashboard.contentCount} </h3>
                                    <p> Total Content Submission </p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-users"></i>
                                </div>
                                {/* <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a> */}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    );
};

export default DashboardHome;