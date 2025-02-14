import React, { useEffect, useState } from "react";

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(1);

  useEffect(() => {
    // Fetch initial visitor count from local storage or server
    const storedCount = localStorage.getItem("visitorCount");
    if (storedCount) {
      setVisitorCount(parseInt(storedCount, 10));
    }

    // Increment visitor count on component mount
    const newCount = visitorCount + 1;
    setVisitorCount(newCount);
    localStorage.setItem("visitorCount", newCount);
  }, []);

  return (
    <footer className="bg-blue-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8 text-left">
        {/* Explore NIELIT */}
        <div>
          <h3 className="font-bold text-lg mb-4">Explore NIELIT</h3>
          <ul className="space-y-2">
            <li>Act and Rules</li>
            <li>Delegation of Powers</li>
            <li>Recognition</li>
            <li>Opportunities</li>
            <li>Annual Report</li>
            <li>MoUs</li>
            <li>RTI</li>
            <li>Vigilance</li>
            <li>Grievance</li>
          </ul>
        </div>

        {/* Website Policies */}
        <div>
          <h3 className="font-bold text-lg mb-4">Website Policies</h3>
          <ul className="space-y-2">
            <li>COVID Compliance</li>
            <li>Disclaimer</li>
            <li>Sitemap</li>
            <li>Privacy Policy</li>
            <li>Citizen Charter</li>
            <li>Website Policies</li>
            <li>Terms and Conditions</li>
            <li>Help</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li>meity.gov.in</li>
            <li>india.gov.in</li>
            <li>mygov.in</li>
            <li>rtionline.gov.in</li>
            <li>esdm-skill.deity.gov.in</li>
            <li>pgportal.gov.in</li>
            <li>portal.cvc.gov.in</li>
            <li>email.gov.in</li>
          </ul>
        </div>

        {/* Online Services */}
        <div>
          <h3 className="font-bold text-lg mb-4">Online Services</h3>
          <ul className="space-y-2">
            <li>Registration</li>
            <li>e-Certificate</li>
            <li>Accreditation</li>
            <li>CCC/BCC Facilitation</li>
            <li>IEEE e-Resources</li>
            <li>Examination</li>
            <li>Placement Portal</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-bold text-lg mb-4">Contact Us</h3>
          <p>
            NIELIT Bhawan,
            <br />
            Plot No. 3, PSP Pocket, Sector-8,
            <br />
            Dwarka, New Delhi-110077
          </p>
          <p>Board No.: 011-44446777</p>
          <p>Help Desk: 011-44446771 [Mon-Sat, 9AM-5:30PM]</p>
          <p>Email: contact[at]nielit[dot]gov[dot]in</p>
        </div>
      </div>
      <div className="text-center mt-8 text-sm">
        <p>Visitors: {visitorCount}</p>
        <p>&copy; NIELIT. All Rights Reserved.</p>
        <p>By RR & SK</p>
      </div>
    </footer>
  );
};

export default Footer;
