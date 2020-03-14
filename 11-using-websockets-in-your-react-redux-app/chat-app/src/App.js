import React, { useState, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import WebSocketProvider, { WebSocketContext } from './WebSocket';
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './store';
import { createRoom, setUsername, joinRoom } from './actions';

function ChatRoom() {
	const [usernameInput, setUsernameInput] = useState("");
	const [msgInput, setMsgInput] = useState("");

	const room = useSelector(state => state.room);
	const username = useSelector(state => state.username);
	const chats = useSelector(state => state.chatLog);

	const dispatch = useDispatch();
	const ws = useContext(WebSocketContext);

	function enterRooom(){
		dispatch(setUsername(usernameInput));
	}

	const sendMessage = () => {
		ws.sendMessage(room.id, {
			username: username,
			message: msgInput
		});
	}

	return (
		<div>
			<h3>{room.name} ({room.id})</h3>
			{!username && 
			<div className="user">
				<input type="text" placeholder="Enter username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
				<button onClick={enterRooom}>Enter Room</button>
			</div>	
			}
			{username &&
			<div className="room">
				<div className="history" style={{width:"400px", border:"1px solid #ccc", height:"100px", textAlign: "left", padding: "10px", overflow: "scroll"}}>
					{chats.map((c, i) => (
						<div key={i}><i>{c.username}:</i> {c.message}</div>
					))}
				</div>
				<div className="control">
					<input type="text" value={msgInput} onChange={(e) => setMsgInput(e.target.value)} />
					<button onClick={sendMessage}>Send</button>
				</div>
			</div>
			}

		</div>
	)
}

function HomeComponent(){
	const [roomName, setRoomName] = useState("");
	const [roomId, setRoomId] = useState("");
	const currentRoom = useSelector(state => state.room);

	const dispatch = useDispatch();

    return (
			<>
				{!currentRoom && 
					<div className="create">
						<div>
							<span>Create new room</span>
							<input type="text" placeholder="Room name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
							<button onClick={() => dispatch(createRoom(roomName))}>Create</button>
						</div>
						<div>
							<span>Join existing room</span>
							<input type="text" placeholder="Room code" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
							<button onClick={() => dispatch(joinRoom(roomId))}>Join</button>
						</div>
					</div>	
				}

				{currentRoom && 
                	<ChatRoom />
				}
			</>
	);
}

function App() {
	return (
		<Provider store={store}>
			<WebSocketProvider>
				<div className="App">
					<HomeComponent />
				</div>
			</WebSocketProvider>
		</Provider>
	)
}

export default App;
