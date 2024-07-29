const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGO_URL || "mongodb://0.0.0.0:27017/rentify";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database"))
    .catch((e) => console.log("Database connection error:", e));

const buyers = require('./model/Buyer');
const sellers = require('./model/Seller');
const roles = require('./model/Role');
const properties = require('./model/Property');
const propertybuyer = require('./model/PropertyBuyer');

const getNextUserId = async () => {
    try {
        const maxUser = await roles.findOne().sort({ userId: -1 });
        return maxUser ? maxUser.userId + 1 : 1;
    } catch (error) {
        console.error('Error getting next Id:', error);
        throw error;
    }
};

const getNextPropertyId = async () => {
    try {
        const maxProperty = await properties.findOne().sort({ propertyId: -1 });
        return maxProperty ? maxProperty.propertyId + 1 : 1;
    } catch (error) {
        console.error('Error getting next Id:', error);
        throw error;
    }
};

app.post("/user-signup", async (req, res) => {
    try {
        const { email, firstName, lastName, phoneNumber, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12); 
        let newUser;

        let existingUser = await roles.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const nextUserId = await getNextUserId();
        let newRole = new roles({ userId: nextUserId, email, role });

        if (role === "seller") {
            newUser = new sellers({
                sellerId: nextUserId,
                email,
                sellerFirstName: firstName,
                sellerLastName: lastName,
                phoneNumber,
                password: hashedPassword,
                isSellerActive: true
            });
        } else if (role === "buyer") {
            newUser = new buyers({
                buyerId: nextUserId,
                email,
                buyerFirstName: firstName,
                buyerLastName: lastName,
                phoneNumber,
                password: hashedPassword,
                isBuyerActive: true
            });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        await newUser.save();
        await newRole.save();
        res.status(200).json({ message: 'Registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/user-login", async (req, res) => {
    try {
        const { email, password, role } = req.body;
        let existingUser = await roles.findOne({ email });

        if (!existingUser || existingUser.role !== role) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        let user;
        if (role === "seller") {
            user = await sellers.findOne({ sellerId: existingUser.userId });
        } else if (role === "buyer") {
            user = await buyers.findOne({ buyerId: existingUser.userId });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        res.status(200).json({ message: 'Authentication successful', userName: user.userName });
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/properties-uploads', async (req, res) => {
    try {
        const { name, area, price, noOfBedroom, noOfBathroom, nearbySchool, nearbyCollege, nearbyHospital } = req.body;

        // Check if loginUserId is set
        if (!loginUserId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Validate request body
        if (!name || !area || !price || !noOfBedroom || !noOfBathroom || nearbySchool === undefined || nearbyCollege === undefined || nearbyHospital === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Ensure boolean values are true/false
        const validNearbySchool = typeof nearbySchool === 'boolean';
        const validNearbyCollege = typeof nearbyCollege === 'boolean';
        const validNearbyHospital = typeof nearbyHospital === 'boolean';

        if (!validNearbySchool || !validNearbyCollege || !validNearbyHospital) {
            return res.status(400).json({ message: 'Nearby fields must be boolean' });
        }

        const nextPropertyId = await getNextPropertyId();

        const newProperty = new properties({
            propertySellerId: loginUserId,
            propertyId: nextPropertyId,
            name,
            area,
            price,
            noOfBedroom,
            noOfBathroom,
            nearbySchool,
            nearbyCollege,
            nearbyHospital,
            like: 0
        });

        // Log the new property details
        console.log('New Property Details:', newProperty);

        const savedProperty = await newProperty.save();
        res.status(200).json({ message: 'Property uploaded successfully', property: savedProperty });
    } catch (error) {
        console.error('Error uploading property:', error);
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
});

app.get('/seller-properties', async (req, res) => {
    try {
        const sellerProperties = await properties.find({ propertySellerId: loginUserId });
        res.send(sellerProperties);
    } catch (error) {
        console.error('Error fetching seller properties:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/properties', async (req, res) => {
    try {
        const propertiesDetails = await properties.find();
        res.json(propertiesDetails);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
