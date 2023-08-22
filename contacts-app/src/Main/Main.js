import React from "react";
import Navbar from "../Navbar/Navbar";
import Content from "../Content/Content";
import "./Main.css";

const Main = () => {
  return (
    <div className="main">
      <div className="m-navbar">
        <Navbar /> {/* calling the Navbar Component */}
      </div>
      <div className="m-content">
        <Content /> {/* calling the Content Component */}
      </div>
    </div>
  );
};

export default Main;
