import React from "react";
import { useAuthContext } from "../context/AuthContext";

const About = () => {
  const { mode } = useAuthContext();
  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        mode === "dark" ? "bg-gray-950 text-white" : ""
      }`}
    >
      <h1 className="text-3xl font-semibold mb-4 badge badge-primary badge-outline h-full">
        About LaptopMart
      </h1>
      <p className="mb-4">
        LaptopMart is your go-to destination for all things laptops. Whether
        you're a student, a professional, or a casual user, we've got the
        perfect laptop for you. With a wide range of brands, models, and
        configurations, we ensure that you find the laptop that meets your needs
        and fits your budget.
      </p>
      <p className="mb-4">
        At LaptopMart, we are committed to providing our customers with the best
        shopping experience. Our user-friendly website makes it easy to browse
        through our extensive collection, compare prices and features, and make
        informed decisions. Plus, our secure payment gateway ensures that your
        transactions are safe and hassle-free.
      </p>
      <p className="mb-4">
        Have questions or need assistance? Our dedicated customer support team
        is here to help. Feel free to reach out to us via phone, email, or live
        chat, and we'll be happy to assist you every step of the way.
      </p>
      <p>
        Thank you for choosing LaptopMart for all your laptop needs. Happy
        shopping!
      </p>
    </div>
  );
};

export default About;
