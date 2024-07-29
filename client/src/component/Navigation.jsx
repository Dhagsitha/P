import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navigation.css';
import { FaUser, FaInfoCircle } from "react-icons/fa";


const Navigation = () => {
  return (
    <div className="navigation">
        <Link to="/">
        <div className="logo">
            <span class="title">RENTIFY</span>
        </div>
        </Link>
        <div className='left-icons'>
            <ul className='left-icons'>
                <li>
                    <Link to="/login"><FaUser/></Link>
                </li>
                <li>
                    <Link to="/contact"><FaInfoCircle /></Link>
                </li>
            </ul>
        </div>
    </div>
  );
};
export default Navigation;
