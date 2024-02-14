import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import "./App.css";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <form onSubmit={joinRoom} className="joinchat-container">
          <h1>Welcome!</h1>
          <h3>Chat Application</h3>
          <input
            type="text"
            placeholder="Enter your name ex:Jack"
            value={username}
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter Room ID to join"
            value={room}
            required
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button type="submit">Start Chatting</button>
        </form>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
