import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Navigation from './component/Navigation';
import Contact from './component/Contact';
import Signup from './component/Signup';
import Login from './component/Login';
import BuyerDashBoard from './component/BuyerDashBoard';
import SellerDashBoard from './component/SellerDashBoard';
/*



import BuyerSidebar from './component/BuyerSidebar';
import BuyerDashBoard from './component/BuyerDashBoard';
import BuyerDetails from './component/BuyerDetails';
import BuyerProfile from './component/BuyerProfile';
import BuyerConnections from './component/BuyerConnections';
import BuyerCommunity from './component/BuyerCommunity';
import BuyerPayment from './component/BuyerPayment';

import SellerSidebar from './component/SellerSidebar';
import SellerDashBoard from './component/SellerDashBoard';
import SellerDetails from './component/SellerDetails';
import SellerProjects from './component/SellerProjects';
import SellerProfile from './component/SellerProfile';
import SellerConnections from './component/SellerConnections';
import SellerCommunity from './component/SellerCommunity';
import SellerPayment from './component/SellerPayment';
import SellerProjectProfile from './component/SellerProjectsProfile';
import SellerProfileProjectDetails from './component/SellerProfileProjectDetails';

import MyNetwork from './component/MyNetwork';
import ProjectDetails from './component/ProjectDetails';
import ProjectProfile from './component/ProjectProfile';*/

const App = () => {

  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);
  const [isBuyerLoggedIn, setIsBuyerLoggedIn] = useState(false);

  return (
    <Router>
      <Navigation/>
      {/*
      {isSellerLoggedIn && <SellerSidebar setIsSellerLoggedIn={setIsSellerLoggedIn} />}
      {isBuyerLoggedIn && <BuyerSidebar setIsBuyerLoggedIn={setIsBuyerLoggedIn} />}
  */}

      <Routes>
        

        <Route path="/" element={<Home setIsSellerLoggedIn={setIsSellerLoggedIn} setIsBuyerLoggedIn={setIsBuyerLoggedIn} />} />
        <Route path="contact" element={<Contact setIsSellerLoggedIn={setIsSellerLoggedIn} setIsBuyerLoggedIn={setIsBuyerLoggedIn} />} />
        <Route path="signup" element={<Signup setIsSellerLoggedIn={setIsSellerLoggedIn} setIsBuyerLoggedIn={setIsBuyerLoggedIn} />} />
        <Route path="login" element={<Login setIsSellerLoggedIn={setIsSellerLoggedIn} setIsBuyerLoggedIn={setIsBuyerLoggedIn} />} />
        {isSellerLoggedIn && (
          <>
          <Route path="seller-dashboard" element={<SellerDashBoard />} />
          </>
        )}
        {isBuyerLoggedIn && (
          <>
          <Route path="buyer-dashboard" element={<BuyerDashBoard />} />
          </>
        )}
        <Route path="seller-dashboard" element={<Login setIsSellerLoggedIn={setIsSellerLoggedIn} setIsBuyerLoggedIn={setIsBuyerLoggedIn} />} />

        {/*


        <Route path="admin-access" element={<AdminAccess setIsSellerLoggedIn={setIsSellerLoggedIn} setIsBuyerLoggedIn={setIsBuyerLoggedIn} />} />
        <Route path="admin-login" element={<AdminLogin setIsSellerLoggedIn={setIsSellerLoggedIn} setIsBuyerLoggedIn={setIsBuyerLoggedIn}  />} />



        {isSellerLoggedIn && (
          <>
          <Route path="seller-dashboard" element={<SellerDashBoard />} />
          <Route path="seller-profile" element={<SellerProfile />} />
          <Route path="projects-details" element={<ProjectDetails />} />
          <Route path="my-projects" element={<SellerProjects />} />
          <Route path="seller-community" element={<SellerCommunity />} />
          <Route path="seller-connections" element={<SellerConnections/>} />
          <Route path="seller-profile/:sellerId" element={<SellerProfile />} />
          <Route path="buyer-profile/:buyerId" element={<BuyerProfile />} />
          <Route path="my-network/:group" element={<MyNetwork />} />
          <Route path="project-profile/:sellerProjectId" element={<ProjectProfile isBuyerLoggedIn={isBuyerLoggedIn} />} />
          <Route path="my-project-profile/:sellerProjectId" element={<SellerProjectProfile />} />
          <Route path="seller-payments" element={<SellerPayment/>} />
          <Route path="/seller-profile/seller-projects-details/:sellerId" element={<SellerProfileProjectDetails />} />
          <Route path="/seller-profile/:id/seller-projects-details/:sellerId" element={<SellerProfileProjectDetails />} />
          </>
        )}

        {isBuyerLoggedIn && (
          <>
          <Route path="buyer-dashboard" element={<BuyerDashBoard />} />
          <Route path="buyer-profile" element={<BuyerProfile />} />
          <Route path="projects-details" element={<ProjectDetails />} />
          <Route path="buyer-community" element={<BuyerCommunity />} />
          <Route path="buyer-connections" element={<BuyerConnections/>} />
          <Route path="seller-profile/:sellerId" element={<SellerProfile />} />
          <Route path="buyer-profile/:buyerId" element={<BuyerProfile />} />
          <Route path="my-network/:group" element={<MyNetwork />} />
          <Route path="project-profile/:sellerProjectId" element={<ProjectProfile isBuyerLoggedIn={isBuyerLoggedIn} />} />
          <Route path="buyer-payments" element={<BuyerPayment/>} />
          <Route path="/seller-profile/seller-projects-details/:sellerId" element={<SellerProfileProjectDetails />} />
          <Route path="/seller-profile/:id/seller-projects-details/:sellerId" element={<SellerProfileProjectDetails />} />
          </>
        )}*/}

      </Routes>
    </Router>
  );
};

export default App;