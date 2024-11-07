import React, { useState } from "react";
import "./Navbar.css"; // Importing external CSS for styling

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">Jobsite Management Portal</div>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
        <li><a href="/">Home</a></li>
        <li><a href="/employee">Employee</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/equipment">Equipment</a></li>
        <li><a href="/workerschedule">Worker Schedule</a></li>
      </ul>
      <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
    </nav>
  );
};

export default Navbar;
