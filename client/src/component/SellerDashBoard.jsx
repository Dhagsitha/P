import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import '../style/DisplayRentalProperties.css';

function SellerDashBoard() {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [propertiesData, setPropertiesData] = useState({
    name: '',
    area: '',
    price: '',
    noOfBedroom: '',
    noOfBathroom: '',
    nearbySchool: false,
    nearbyCollege: false,
    nearbyHospital: false
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/seller-properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertiesData({ ...propertiesData, [name]: value });
    validateInput(name, value);
  };

  const handleRadioChange = (e) => {
    const { name } = e.target;
    setPropertiesData((properties) => ({ ...properties, [name]: !properties[name] }));
  };

  const validateInput = (name, value) => {
    setErrors((prevErrors) => {
      const validationErrors = { ...prevErrors };
      switch (name) {
        case 'name':
          validationErrors.name = value.trim() ? null : 'Name is required';
          break;
        case 'area':
          validationErrors.area = value.trim() ? null : 'Area is required';
          break;
        case 'price':
          validationErrors.price = /^\d+$/.test(value) ? null : 'Price must be a valid integer';
          break;
        case 'noOfBedroom':
          validationErrors.noOfBedroom = /^\d+$/.test(value) && value >= 0 && value <= 50 ? null : 'Bedrooms must be an integer between 0 and 50';
          break;
        case 'noOfBathroom':
          validationErrors.noOfBathroom = /^\d+$/.test(value) && value >= 0 && value <= 50 ? null : 'Bathrooms must be an integer between 0 and 50';
          break;
        default:
          break;
      }
      return validationErrors;
    });
  };

  const handleAddProperties = () => {
    setShowModal(true);
  };

  const handleUploadProperties = async () => {
    try {
        const response = await axios.post('http://localhost:5000/properties-uploads', {
            name: 'Property Name',
            area: '1000 sqft',
            price: '500000',
            noOfBedroom: '3',
            noOfBathroom: '2',
            nearbySchool: true, // Boolean values
            nearbyCollege: true, // Boolean values
            nearbyHospital: true  // Boolean values
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error uploading properties:', error);
    }
};


  const validateForm = () => {
    const { name, area, price, noOfBedroom, noOfBathroom } = propertiesData;
    const validationErrors = {};
    
    if (!name.trim()) 
      validationErrors.name = 'Name is required';
    
    if (!area.trim()) 
      validationErrors.area = 'Area is required';
    
    if (!/^\d+$/.test(price)) 
      validationErrors.price = 'Price must be a valid integer';
    
    if (!/^\d+$/.test(noOfBedroom) || noOfBedroom < 0 || noOfBedroom > 50) 
      validationErrors.noOfBedroom = 'Bedrooms must be an integer between 0 and 50';
    
    if (!/^\d+$/.test(noOfBathroom) || noOfBathroom < 0 || noOfBathroom > 50) 
      validationErrors.noOfBathroom = 'Bathrooms must be an integer between 0 and 50';

    setErrors(validationErrors);
    return Object.values(validationErrors).every(value => value === null);
  };

  const inputStyle = (name) => {
    if (errors[name]) 
      return { borderColor: '#CB2D6F' };
    else if (formSubmitted && !errors[name]) 
      return { borderColor: '#2A363B' };
    else 
      return { borderColor: '#ccc' };
  };

  return (
    <div className="displayDetails">
      <div className="content">
        <h2>My Properties</h2>
        <AiOutlinePlus className="add-properties-icon" onClick={handleAddProperties} />
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <h2>Add Property</h2>
              <label>
                Property Name:
                <input
                  type="text"
                  name="name"
                  value={propertiesData.name}
                  onChange={handleChange}
                  style={inputStyle('name')}
                />
                {formSubmitted && errors.name && <div className="error">{errors.name}</div>}
              </label>
              <br />
              <label>
                Area:
                <input
                  type="text"
                  name="area"
                  value={propertiesData.area}
                  onChange={handleChange}
                  style={inputStyle('area')}
                />
                {formSubmitted && errors.area && <div className="error">{errors.area}</div>}
              </label>
              <br />
              <label>
                Price (in INR):
                <input
                  type="text"
                  name="price"
                  value={propertiesData.price}
                  onChange={handleChange}
                  style={inputStyle('price')}
                />
                {formSubmitted && errors.price && <div className="error">{errors.price}</div>}
              </label>
              <br />
              <label>
                Number of Bedroom (0 - 50):
                <input
                  type="text"
                  name="noOfBedroom"
                  value={propertiesData.noOfBedroom}
                  onChange={handleChange}
                  style={inputStyle('noOfBedroom')}
                />
                {formSubmitted && errors.noOfBedroom && <div className="error">{errors.noOfBedroom}</div>}
              </label>
              <br />
              <label>
                Number of Bathroom (0 - 50):
                <input
                  type="text"
                  name="noOfBathroom"
                  value={propertiesData.noOfBathroom}
                  onChange={handleChange}
                  style={inputStyle('noOfBathroom')}
                />
                {formSubmitted && errors.noOfBathroom && <div className="error">{errors.noOfBathroom}</div>}
              </label>
              <br />
              <label>
                <div className="radio-group">
                    Nearby School : 
                  <input
                      id="nearbySchoolYes"
                      name="nearbySchool"
                      type="radio"
                      checked={propertiesData.nearbySchool === true}
                      onChange={handleRadioChange}
                  />
                  <label htmlFor="nearbySchoolYes">Yes</label>
                  <input
                      id="nearbySchoolNo"
                      name="nearbySchool"
                      type="radio"
                      checked={propertiesData.nearbySchool === false}
                      onChange={handleRadioChange}
                  />
                  <label htmlFor="nearbySchoolNo">No</label>
              </div>
              </label>
              <br />
              <label>
                <div className="radio-group">
                    Nearby College : 
                  <input
                      id="nearbyCollegeYes"
                      name="nearbyCollege"
                      type="radio"
                      checked={propertiesData.nearbyCollege === true}
                      onChange={handleRadioChange}
                  />
                  <label htmlFor="nearbyCollegeYes">Yes</label>
                  <input
                      id="nearbyCollegeNo"
                      name="nearbyCollege"
                      type="radio"
                      checked={propertiesData.nearbyCollege === false}
                      onChange={handleRadioChange}
                  />
                  <label htmlFor="nearbyCollegeNo">No</label>
              </div>
              </label>
              <br />
              <label>
                <div className="radio-group">
                    Nearby Hospital : 
                  <input
                      id="nearbyHospitalYes"
                      name="nearbyHospital"
                      type="radio"
                      checked={propertiesData.nearbyHospital === true}
                      onChange={handleRadioChange}
                  />
                  <label htmlFor="nearbyHospitalYes">Yes</label>
                  <input
                      id="nearbyHospitalNo"
                      name="nearbyHospital"
                      type="radio"
                      checked={propertiesData.nearbyHospital === false}
                      onChange={handleRadioChange}
                  />
                  <label htmlFor="nearbyHospitalNo">No</label>
              </div>
              </label>
              <br />
              <center><button onClick={handleUploadProperties}>Upload Properties</button></center>
            </div>
          </div>
        )}
      </div>
      
      <div className="properties">
      {properties.length === 0 ? (
          <h3 style={{ marginLeft: '10px',marginTop: '-10px' }}>There is no property.</h3>
        ) : (
          properties.map((property, index) => (
            <div className="properties-details" key={index}>
              <div className="properties-info">
                <div><strong>{property.name || 'Default Title'}</strong><br/></div>
                <div><strong>₹ {property.price || 'Default Price'}</strong><br/></div>
                <div><strong>{property.area || 'Default Area'}</strong></div>
              </div>
              <div className="noOfRoom">
                <div>
                  <strong>Bedrooms:</strong> {property.noOfBedroom || 'Not specified'}
                </div>
                <div>
                  <strong>Bathrooms:</strong> {property.noOfBathroom || 'Not specified'}
                </div>
              </div>
              <div className='additionalFeatures'>
                  {property.nearbySchool && <div>Nearby School</div>}
                  {property.nearbyCollege && <div>Nearby College</div>}
                  {property.nearbyHospital && <div>Nearby Hospital</div>}
              </div>
            </div>
            
          ))
        )}

      </div>
    </div>
  );
}

export default SellerDashBoard;
