import React, { useState } from "react";
import { FaSearch, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

function Header() {
  const [fontSize, setFontSize] = useState(16);
  const [searchTerm, setSearchTerm] = useState("");

  const adjustFontSize = (size) => {
    setFontSize(size);
    document.body.style.fontSize = `${size}px`;
  };

  return (
    <header className="nielit-header font-sans shadow-md w-full ">
      {/* Top Bar */}
      <div className="flex justify-between p-2 px-5 bg-gradient-to-r from-gray-100 to-gray-200 items-center w-full">
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/NIELITIndia/"
            className="text-blue-600 hover:text-blue-800"
          >
            <FaFacebookF size={18} />
          </a>
          <a href="https://x.com/NIELITIndia" className="text-blue-400">
            <FaTwitter size={18} />
          </a>
          <a
            href="https://www.youtube.com/NIELITIndia"
            className="text-red-500"
          >
            <FaYoutube size={18} />
          </a>
        </div>

        <div className="flex items-center">
          <div className="mr-5">
            <a href="#" className="text-blue-600 hover:underline">
              Screen Reader Access
            </a>
            <span className="mx-1 text-gray-600">|</span>
            <a href="#" className="text-blue-600 hover:underline">
              Skip to main content
            </a>
          </div>

          <div className="text-options flex items-center">
            <button
              onClick={() => adjustFontSize(fontSize - 2)}
              className="border px-3 py-1 mx-1 rounded-md text-sm hover:bg-gray-200"
            >
              A-
            </button>
            <button
              onClick={() => adjustFontSize(16)}
              className="border px-3 py-1 mx-1 rounded-md text-sm hover:bg-gray-200"
            >
              A
            </button>
            <button
              onClick={() => adjustFontSize(fontSize + 2)}
              className="border px-3 py-1 mx-1 rounded-md text-sm hover:bg-gray-200"
            >
              A+
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex ml-5">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 w-48 border rounded-l-md focus:ring-2 focus:ring-indigo-400"
            />
            <button className="p-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex justify-between p-4 items-center bg-white shadow-md">
        {/* Left Section */}
        <div className="flex items-center">
          <img src="Logo.png" alt="Logo" className="mr-4 w-24 h-14" />
          <div className="header-title">
            <h1 className="text-lg text-blue-700 font-semibold">
              राष्ट्रीय इलेक्ट्रॉनिकी एवं सूचना प्रौद्योगिकी संस्थान
            </h1>
            <h2 className="text-sm text-gray-600">
              National Institute of Electronics & Information Technology
            </h2>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center">
          <img
            src="Emblem.png"
            alt="Government of India Logo"
            className="mr-4 w-12 h-16"
          />
          <div className="ministry-title">
            <h3 className="text-blue-700 font-medium">
              Ministry of Electronics & Information Technology
            </h3>
            <h4 className="text-sm text-gray-600">Government of India</h4>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
