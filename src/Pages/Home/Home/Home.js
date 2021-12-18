import React from 'react';
import Banner from '../Banner/Banner';
import Contact from '../Contact/Contact';
import Members from '../Members/Members';
import Products from '../Products/Products';
import Header from './../../Shared/Header/Header';
import Footer from './../../Shared/Footer/Footer';
import Research from '../Research/Research';

const Home = () => {
    return (
        <div id="home">
            <Header></Header>
            <Banner></Banner>
            <Research></Research>
            <Products></Products>
            <Members></Members>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    );
};

export default Home;