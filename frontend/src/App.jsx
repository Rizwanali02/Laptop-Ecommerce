import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/Contect";
import About from "./components/About";
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import SingleLapys from "./pages/SingleLapys";
import CreateProducts from "./pages/Admin/CreateProducts";

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

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {isAuthenticated ? (
          <Route path="/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="/admin/create" element={<CreateProducts />} />
        <Route path="/lapy/:id" element={<SingleLapys />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
      <Footer />
    </Router>
  );
};

export default App;
