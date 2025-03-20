
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
    <header className="nielit-header font-sans shadow-md w-full">
      {/* Top Bar */}
      <div className="flex flex-wrap justify-between p-2 px-5 bg-gradient-to-r from-gray-100 to-gray-200 items-center w-full text-sm md:text-base">
        <div className="flex gap-2 md:gap-4">
          <a href="https://www.facebook.com/NIELITIndia/" className="text-blue-600 hover:text-blue-800">
            <FaFacebookF size={18} />
          </a>
          <a href="https://x.com/NIELITIndia" className="text-blue-400">
            <FaTwitter size={18} />
          </a>
          <a href="https://www.youtube.com/NIELITIndia" className="text-red-500">
            <FaYoutube size={18} />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <div className="text-options flex items-center">
            <button onClick={() => adjustFontSize(fontSize - 2)} className="border px-2 py-1 rounded-md text-xs md:text-sm hover:bg-gray-200">
              A-
            </button>
            <button onClick={() => adjustFontSize(16)} className="border px-2 py-1 rounded-md text-xs md:text-sm hover:bg-gray-200">
              A
            </button>
            <button onClick={() => adjustFontSize(fontSize + 2)} className="border px-2 py-1 rounded-md text-xs md:text-sm hover:bg-gray-200">
              A+
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 w-32 sm:w-40 md:w-48 border rounded-l-md focus:ring-2 focus:ring-[#1976d2]"
            />
            <button className="p-2 bg-[#1976d2] text-white rounded-r-md hover:bg-white hover:text-[#1976d2]">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md text-center md:text-left">
        {/* Left Section */}
        <div className="flex items-center">
          <img src="Logo.png" alt="Logo" className="mr-2 w-20 h-12 md:w-24 md:h-14" />
          <div className="header-title">
            <h1 className="text-sm md:text-lg text-[#1976d2] font-semibold">
              राष्ट्रीय इलेक्ट्रॉनिकी एवं सूचना प्रौद्योगिकी संस्थान
            </h1>
            <h2 className="text-xs md:text-sm text-gray-600">
              National Institute of Electronics & Information Technology
            </h2>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center mt-2 md:mt-0">
          <img src="Emblem.png" alt="Government of India Logo" className="mr-2 w-10 h-14 md:w-12 md:h-16" />
          <div className="ministry-title">
            <h3 className="text-sm md:text-base text-[#1976d2] font-medium">
              Ministry of Electronics & Information Technology
            </h3>
            <h4 className="text-xs md:text-sm text-gray-600">Government of India</h4>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
