import React from "react";
import "../styles/InfoBar.css";
const InfoBar = ({ room, name }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <i
          className="fa fa-circle onlineIcon"
          style={{ color: "#66d39a", fontSize: "0.6rem" }}
        ></i>
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          {" "}
          <i
            className="fa fa-times-circle"
            style={{ color: "#fafafa" }}
          ></i>{" "}
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
