  
import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, Button, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "./firebase";
import Attachimage from "./AttachImage";
import EmojiSelector from "./EmojiSelector";

function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [showEmojiIcon, setShowEmoji] = useState(false);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot(snapshot => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = e => {
    e.preventDefault();
    console.log("message types", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: "12 Noveyhy"
    });

    setInput("");
  };

  // const selectEmoji = () => {
  //   document.getElementById.emojioneArea({
  //     pickerPosition: "top",
  //     filtersPosition: "bottom",
  //     tones: false,
  //     autocomplete: false,
  //     inline: true,
  //     hidePickerOnBlur: false
  //   });
  // };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__header-info">
          <h3>{roomName}</h3>
          <p>Last Seen</p>
        </div>
        <div className="chat__header-right">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <Attachimage />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map(message => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">12 Nov</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        {/* <InsertEmoticonIcon /> */}
        <div className="emojiIcon/SearchEmoji">
          {showEmojiIcon && <EmojiSelector />}
          <Button
            onClick={() => setShowEmoji(!showEmojiIcon)}
            className="emoji-Icon__button"
            variant="outlined"
          >
            {showEmojiIcon ? "Dismiss Emoji" : <InsertEmoticonIcon />}{" "}
          </Button>
        </div>

        <form>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a Message"
            type="text"
          />
          <button onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;