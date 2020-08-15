import React from "react";
import "../styles/Input.css";
export default function Input({ message, handleMessage, handleOnKeyPress }) {
  return (
    <form action="" className="form">
      <input
        className="input"
        type="text"
        placeholder="Type message "
        value={message}
        onChange={handleMessage}
        onKeyPress={handleOnKeyPress}
      />

      <button className="sendButton" onClick={handleOnKeyPress}>
        Send
      </button>
    </form>
  );
}
