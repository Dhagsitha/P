import React, { useState } from 'react';
import '../style/Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsSellerLoggedIn, setIsBuyerLoggedIn }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        // Simulate successful form submission for demonstration
        setMessage('Login successful');
        setMessageStyle({ color: '#2A363B' });
        setTimeout(() => {
            navigate(`/${formData.role}-dashboard`);
            if (formData.role === 'seller') {
                setIsSellerLoggedIn(true);
            } else if (formData.role === 'buyer') {
                setIsBuyerLoggedIn(true);
            }
        }, 1000);
    };

    return (
        <div className='Log-in'>
            <div className='login'>
                <div className='form-login'>
                    <h2>Login</h2>
                    <form id="form" onSubmit={handleSubmit}>
                        <div className='input-control'>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Email ID'
                                autoComplete="off"
                                required
                            />
                        </div>
                        <br />
                        <div className='input-control'>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-input"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Password'
                                autoComplete="off"
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
                    <Link to="/signup"><h3>Don't have an account? Sign up</h3></Link>
                    <br />
                    <p className="errorMessage" style={messageStyle}>{message}</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
