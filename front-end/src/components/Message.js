import React from "react";
import "../styles/Message.css";
const Message = ({ message, name }) => {
  let isSendByCurrentUser = false;
  const { user, text } = message;
  const trimName = name.trim().toLowerCase();
  if (user === trimName) {
    isSendByCurrentUser = true;
  }
  return isSendByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sendText pr-10">{name}</p>

      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sendText pl-10">{name}</p>
    </div>
  );
};

export default Message;
