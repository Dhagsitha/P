import React from 'react';
import '../style/Home.css';
import home from '../image/home.jpg'

import { Link } from 'react-router-dom';

const Home = ({ setIsSellerLoggedIn, setIsBuyerLoggedIn}) => {
  setIsSellerLoggedIn(false);
  setIsBuyerLoggedIn(false);

  return (
    <div className="home">
      <div className="home-content">
        <div className="home-column">
        <img src={home} alt="Home" />
        </div>
        <div className="home-column">
          <h2> <b><i>YOUR IDEAL HOME AWAITS</i></b></h2>
          <p>
            Experience hassle-free renting with our dedicated property management team.
          </p>
          <h2>Discover your dream home with Rentify. Get in touch with us today!</h2>
          <div className="button-container">
            <Link to="/signup" className="link-button"><button  className="signup-button">SignUp</button></Link>
            <Link to="/login" className="link-button"><button className="login-button">Login</button></Link>
          </div>
        </div>
        </div>
      </div>
  );
};

export default Home;
