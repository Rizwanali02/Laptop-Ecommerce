import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import SingleLapys from "./pages/SingleLapys";
import UpdateProducts from "./pages/Admin/UpdateProducts";
import Cart from "./pages/Cart";

// Capitalize the component name
const NotFoundPage = () => {
  return (
    <div>
      <h1>404 Page Not Found</h1>
    </div>
  );
};

const App = () => {
  const { isAuthenticated, user } = useAuthContext();
  console.log(user);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        {isAuthenticated ? (
          <Route path="/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}

        {isAuthenticated && user.user.isAdmin === true ? (
          <Route path="/admin/update/:id" element={<UpdateProducts />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="/lapy/:id" element={<SingleLapys />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
      <Footer />
    </Router>
  );
};

export default App;
