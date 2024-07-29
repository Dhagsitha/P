import React, { useState } from 'react';
import '../style/Signup.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ setIsSellerLoggedIn, setIsBuyerLoggedIn }) => {
    setIsSellerLoggedIn(false);
    setIsBuyerLoggedIn(false);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        role: ''
    });
    const [message, setMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState({});
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form value:', formData);
        // Simulate successful form submission for demonstration
        setMessage('Signup successful');
        setMessageStyle({ color: '#2A363B' });
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    return (
        <div className='signup'>
            <div className='form-signup'>
                <h2>Sign Up</h2>
                <form id="form" onSubmit={handleSubmit}>
                    <div className='input-control'>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder='First name'
                            required
                        />
                    </div>
                    <br />
                    <div className='input-control'>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder='Last name'
                            required
                        />
                    </div>
                    <br />
                    <div className='input-control'>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email ID'
                            required
                        />
                    </div>
                    <br />
                    <div className='input-control'>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder='Phone Number'
                            required
                        />
                    </div>
                    <br />
                    <div className='input-control'>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />
                    </div>
                    <br />
                    <div className='input-control'>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                            required
                        />
                    </div>
                    <br />
                    <div className='input-control'>
                        <div className="radio-group">
                            <input
                                id="seller"
                                name="role"
                                type="radio"
                                value="seller"
                                checked={formData.role === 'seller'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="seller">Seller</label>
                            <input
                                id="buyer"
                                name="role"
                                type="radio"
                                value="buyer"
                                checked={formData.role === 'buyer'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="buyer">Buyer</label>
                        </div>
                    </div>
                    <br />
                    <input type="submit" className="submit-button" value="Submit"></input>
                </form>
                <Link to="/login"><h3>Have an account? Login</h3></Link>
                <br />
                <p className="errorMessage" style={messageStyle}>{message}</p>
            </div>
        </div>
    );
}

export default Signup;
