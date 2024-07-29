import React from 'react'
import '../style/Contact.css'; 

const Contact = ({ setIsSellerLoggedIn, setIsBuyerLoggedIn}) => {
  setIsSellerLoggedIn(false);
  setIsBuyerLoggedIn(false);
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    alert('Submitted successfully');
  };

  return (
    <div className='contact'>

      <div className="container">
        <div className="image"></div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="10" required></textarea>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>

      <div className="icons">
        <div className="icon"><i className="fas fa-envelope"></i> Email:rentify@gmail.com</div>
        <div className="icon"><i className="fas fa-phone"></i> Contact:9791725421</div>
      </div>
      <footer>
        <p>&copy; 2022 IGNITE LEARNING. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default Contact