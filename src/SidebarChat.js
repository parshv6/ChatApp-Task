import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { ChatSharp } from "@material-ui/icons";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))
        );
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt("Enter The Name for chat room");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar-chats">
        <Avatar />
        <div className="sidebar-chat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebar-chats">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;