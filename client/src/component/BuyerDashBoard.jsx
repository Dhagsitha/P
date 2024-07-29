import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import '../style/DisplayRentalProperties.css';

function BuyerDashBoard() {
  const [properties, setProperties] = useState([]);
  const [likedProperties, setLikedProperties] = useState(new Set());

  const toggleLike = (propertyId) => {
    if (likedProperties.has(propertyId)) {
      likedProperties.delete(propertyId);
    } 
    else {
      likedProperties.add(propertyId);
    }
    setLikedProperties(new Set(likedProperties));
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try 
      {
        const response = await axios.get('http://localhost:5000/properties');
        setProperties(response.data);
      } 
      catch (error) 
      {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="properties">
      {properties.length === 0 ? (
        <h3 style={{ marginLeft: '10px', marginTop: '-10px' }}>There is no property.</h3>
      ) : (
        properties.map((property, index) => (
          <div className="properties-details" key={index}>
            <div className="properties-info">
              <div><strong>{property.name || 'Default Title'}</strong><br /></div>
              <div><strong>₹ {property.price || 'Default Price'}</strong><br /></div>
              <div><strong>{property.area || 'Default Area'}</strong></div>
            </div>
            <div className="noOfRoom">
              <div>
                <strong>Bedrooms: </strong> {property.noOfBedroom || 'Not specified'}
              </div>
              <div>
                <strong>Bathrooms: </strong> {property.noOfBathroom || 'Not specified'}
              </div>
            </div>
            <div className='additionalFeatures'>
              {property.nearbySchool && <div>Nearby School</div>}
              {property.nearbyCollege && <div>Nearby College</div>}
              {property.nearbyHospital && <div>Nearby Hospital</div>}
            </div>
            <div className='side'>
              <div>
                <button
                  onClick={() => toggleLike(property._id)}
                  className={likedProperties.has(property._id) ? 'liked' : ''}
                >
                  {likedProperties.has(property._id) ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>
            </div>
        </div>
      </div>
      ))
    )}
    </div>
  );
}

export default BuyerDashBoard;
