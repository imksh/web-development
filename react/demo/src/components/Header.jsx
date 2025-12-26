import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-primary text-white d-flex justify-content-between align-items-center p-2 align-items-center px-5">
      <h2>React</h2>
      <div className="list-unstyled d-flex gap-3 align-items-center  my-auto">
        <Link to="/" className="text-decoration-none text-light">
          Home
        </Link>
        <Link to="/about" className="text-decoration-none text-light">
          About
        </Link>
        <Link to="/products" className="text-decoration-none text-light">
          Products
        </Link>
        <Link to="/contacts" className="text-decoration-none text-light">
          Contacts
        </Link>
      </div>
    </div>
  );
};

export default Header;
