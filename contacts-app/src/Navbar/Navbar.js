import React from "react";
import Lang from "../utils";
import "./Navbar.css";

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    
    /* this function is to set the view into its corresponding div */
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); /* will scroll upon click the nav bar and has a behavior of smooth */
    }
  };

  return (
    <div className="main-primary-nav">
      <nav className="primary-nav">
        <ul role="list">
          <li>
            <a
              className="nav-link"
              onClick={() => scrollToSection("section-home")} /* section-home is the id used to set the view */
            >
              {Lang.LBL_HOME}
            </a>
          </li>
          <li>
            <a
              className="nav-link"
              onClick={() => scrollToSection("section-contact")} /* section-contact is the id used to set the view */
            >
              {Lang.LBL_CONTACT}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
