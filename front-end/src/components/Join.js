import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Join.css";
const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const _handleName = (event) => {
    setName(event.target.value);
  };

  const _handleRoom = (event) => {
    setRoom(event.target.value);
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join Chat</h1>
        <input
          className="joinInput"
          type="text"
          onChange={_handleName}
          value={name}
          placeholder="Name"
        />
        <input
          className="joinInput mt-20"
          type="text"
          onChange={_handleRoom}
          value={room}
          placeholder="Room"
        />
        <Link to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
