import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import TripDetails from './components/TripDetails';
import Cart from './components/Cart';
import CreateTrip from './components/CreateTrip';
import Chat from './components/Chat';
import Profile from './components/Profile';
import CheckoutHandoff from './components/CheckoutHandoff';
import Trips from './components/Trips';
import Social from './components/Social';
import EditProfile from './components/EditProfile';
import { usePushNotifications } from './hooks/usePushNotifications';

export default function App() {
  usePushNotifications();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/social" element={<Social />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/handoff/:id" element={<CheckoutHandoff />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
