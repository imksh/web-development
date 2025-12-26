import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Products from "./pages/Products";
import About from "./pages/About";

function App() {
  let arr = [2, 3, 80, 60, 5];
  let arr2 = arr.reduce((sum, value) => sum + value, 0);
  console.log("arr1: ", arr);
  console.log("arr2: ", arr2);

  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
