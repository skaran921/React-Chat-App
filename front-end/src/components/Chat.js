import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "../styles/Chat.css";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:7000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, () => {});
    setName(name ?? "bot");
    setRoom(room ?? "bot");

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("message.................", message);
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} name={name} />
        <Messages messages={messages} name={name} />
        <Input
          setMessage={setMessage}
          sendMessage={sendMessage}
          message={message}
        />
      </div>
    </div>
  );
};

export default Chat;
