"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <input
          className={classes["chat-input"]}
          type="text"
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={classes["button"]}
          onClick={(e) => sendMessage(message)}
        >
          Send
        </button>
      </div>
      <div>
        {messages.map((e) => (
          <li>{e}</li>
        ))}
      </div>
    </div>
  );
}
