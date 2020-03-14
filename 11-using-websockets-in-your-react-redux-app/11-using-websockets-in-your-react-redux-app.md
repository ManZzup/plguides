## Introduction

WebSocket are a convinient way to create a long running connection between a server and a client. In an instance where a web client needs to constantly check the server for data, having a REST based implementation could lead to long polling and related complexities. WebSocket on the other hand provides a two-way commmunication stream allowing 'pusing' of data from the server to the client.

Although using WebSockets is quite straighforward, integrating it to a React+Redux can be tricky. In this guide, using a practical example, we explore different patterns of integrating WebSockets to a React app, and discuss the pros and cons of each. 

## The Chat App

Given the complex nature of the concepts being dicussed in this guide, we need a sufficiently complex sample app to explain them. So, in today's guide we will be creating a basic chat app. The app would provide following features,

1. Anyone can create a new chatroom and join it
2. On creating a room, a unique code is created so that others can join to the same room
3. Anyone joining the room should first input a username
4. On joining a room, the user can see all past messages from the room
5. Users joined in a room, of course can chat in real-time

These feature set is guide through the concepts that will be dicussed in the guide. To keep it from being overly complicated, features such as user authentication, room listing, private chats are not implemented. But towards end of the guide, you are welcomed to implement such features to test the learnt concepts.

First we will be creating a basic React app that provides the features (1) to (4) above. Those 4 features infact does not need WebSockets for implementation, and can be done using your everyday React tools. We will use Redux with [Redux Toolkit](https://redux-toolkit.js.org/) for state management and [axios](https://github.com/axios/axios) for API connectivity. The chat server will support both a HTTP REST API for CRUD operations and WebSockets for socket related functions.

WebSockets would be mainly used for providing bi-laterlal communication, between the users and the server. When a user enters a message in a room, this messages;
(1) should be sent to server and stored in chat logs so that the users joining later can see
(2) should be broadcasted to all other users in the room
It can be seen as a long-polling requirement from the recieving user's perpective for the client needs to constantly querying the server for new messages. Thus, this is a perfect oppertunity to use the strengths of WebSockets.

## The Chat Server

To being with, we need the server counterpart for the overall chat app to function. In order to manage the scope, implementation of the server won't be discussed in detail in the guider. The server code is available at the (Github Repo).

But let's breifly look at the structure of the server and the features provided by it. The server provides two key APIs, 

### REST API
This would be a standard API where we send requests over HTTP asynchronously from the web app. It would support two endpoints,
1. /room?name="game of thrones"   -   to create a new chat room and return unique code
2. /room/{unique-id}      -   to verify a room when given the unique and send chat log of the room

### WebSocket API
A socket based API where to facilitate the continous two-way communication. WebSockets rely on an *event-based* mechanism over a shared channel rather than individual endpoints. We'll explore this in the actual implementation. 

To keep the server simple, all data would be stored in-memory using basic data structures, allowing us to keep our focus on the web app side.

## The Basic React + Redux App

Before we introduce the WebSockets to the app, let's create the rest of the app and setup Redux. The basic app is quite simple, it would only have 2 components:
(1) `HomeComponent` - Contains options for creating / entering a room
(2) `ChatRoomComponent` - Provides a simple chat interface

Then we use a singe reducer to store the chat logs and other storage elements. Until we add the WebSockets, the actions for sending and receiving messages won't be used. Apart from it follows the standard Redux patterns.

**Note**
We are using React Hooks throughout the guide as recommended by React docs. If you are not familiar with the use of Hooks with Redux, you could have a quick update from [https://www.pluralsight.com/guides/simplifying-redux-bindings-with-react-hooks](Simplifying Redux Bindings with React Hooks).

```javascript
// actions.js
import axios from 'axios';
import { API_BASE } from './config';

export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST"
export const UPDATE_CHAT_LOG = "UPDATE_CHAT_LOG"

// These are our action types
export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST"
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS"
export const CREATE_ROOM_ERROR = "CREATE_ROOM_ERROR"


// Now we define actions
export function createRoomRequest(){
    return {
        type: CREATE_ROOM_REQUEST
    }
}

export function createRoomSuccess(payload){
    return {
        type: CREATE_ROOM_SUCCESS,
        payload
    }
}

export function createRoomError(error){
    return {
        type: CREATE_ROOM_ERROR,
        error
    }
}

export function createRoom(roomName) {
    return async function (dispatch) {
        dispatch(createRoomRequest());
        try{
            const response = await axios.get(`${API_BASE}/room?name=${roomName}`)
            dispatch(createRoomSuccess(response.data));
        }catch(error){
            dispatch(createRoomError(error));
        }
    }
}


export const JOIN_ROOM_REQUEST = "JOIN_ROOM_REQUEST"
export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS"
export const JOIN_ROOM_ERROR = "JOIN_ROOM_ERROR"

export function joinRoomRequest(){
    return {
        type: JOIN_ROOM_REQUEST
    }
}

export function joinRoomSuccess(payload){
    return {
        type: JOIN_ROOM_SUCCESS,
        payload
    }
}

export function joinRoomError(error){
    return {
        type: JOIN_ROOM_ERROR,
        error
    }
}

export function joinRoom(roomId) {
    return async function (dispatch) {
        dispatch(joinRoomRequest());
        try{
            const response = await axios.get(`${API_BASE}/room/${roomId}`)
            dispatch(joinRoomSuccess(response.data));
        }catch(error){
            dispatch(joinRoomError(error));
        }
    }
}

export const SET_USERNAME = "SET_USERNAME"

export function setUsername(username){
    return {
        type: SET_USERNAME,
        username
    }
}
```

```javascript
// reducers.js

import { CREATE_ROOM_SUCCESS, JOIN_ROOM_SUCCESS, SET_USERNAME} from './actions';

const initialState = {
    room: null,
    chatLog: [],
    username: null
}

export default function chatReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }

    switch(action.type){
        case CREATE_ROOM_SUCCESS:
            state.room = action.payload;
            break;
        
        case JOIN_ROOM_SUCCESS:
            state.room = action.payload;
            break;

        case SET_USERNAME:
            state.username = action.username;
            break;
    
    }

    return state
}
```

```javascript
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './store';
import { createRoom, setUsername, joinRoom } from './actions';

function ChatRoom() {
	const [usernameInput, setUsernameInput] = useState("");
	const username = useSelector(state => state.username);
	const dispatch = useDispatch();

	function enterRooom(){
		dispatch(setUsername(usernameInput));
	}

	return (
		<div>
			{!username && 
			<div className="user">
				<input type="text" placeholder="Enter username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
				<button onClick={enterRooom}>Enter Room</button>
			</div>	
			}
			{username &&
			<div className="room">
				<div className="history"></div>
				<div className="control">
					<input type="text" />
					<button>Send</button>
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
			<div className="App">
				<HomeComponent />
			</div>
		</Provider>
	)
}

export default App;
```

The app at this stage supports creating a room and joining to it through the unique code. Next let's focus on adding WebSockets to the mix.

## Adding WebSockets

To facilitate socket communications in React, we use the de-facto library - `socket.io-client`. Use the following command to install it.

`npm install -S socket.io-client`

There are multiple ways of adding WebSocket suport to a React app. Each method would have its own pros and cons. Let's go through some of the common patterns but will explore in detail only on the pattern we are interested in implementing. 

### Component level integration

In this method, we could assume the WebSockets part as a separate util. We initiate a socket connection at the `AppComponent` init, as a singleton. And use the socket instance to listen to socket messages that are relevant to the particular component. Sample implementation is as follows,

```javascript
import { socket } from 'socketUtil.js';
import { useDispatch } from 'react-redux';

function ChatRoomComponent(){
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('event://get-message', payload => {
            // update messages
            useDispatch({ type: UPDATE_CHAT_LOG }, payload)
        });
        socket.on('event://user-joined', payload => {
            // handling a new user joining to room
        });
    });
    
    // other implementations
}
```

As you can see above, this completely seggregates the Redux and WebSocket implementations and gives a plug-and-play pattern. This method is useful if you are implementing WebSockets to few components of an existing app. For example, if you have a Blog app and you want to provide real-time push noifications. In that case, you only need WebSockets for the notification component and this pattern would be a clean way to implement. But if the app is socket heavy, this method would eventually become a burden to develop and maintain. The socket util functions independently and does not work well with React lifecycles. Moreover, the multiple event bindinds in each component would eventually slow down the entire application. 

### Redux middleware integration

Another popular approach is to introduce WebSocket as a middleware to the store. It perfectly harmonizes the WebSocket async nature with the one-way data flow pattern of Redux. In implementation, WebSocket connection would be initiated in the middleware init, and subsequent socket events would be delegated internally to Redux actions. For example, when the `event://get-message` payload reach the client, the middleware will dispatch the `UPLOAD_CHAT_LOG` action internally. The reducers would then update the store with the next set of messages. While this is an interesting approach, it won't be discussed at length in the guide. For your reference, [this article](https://dev.to/aduranil/how-to-use-websockets-with-redux-a-step-by-step-guide-to-writing-understanding-connecting-socket-middleware-to-your-project-km3) provides excellent directions on implementation. This method is ideal if WebSocket is an integral part of the app and tightly coupling with Redux is expected.

### React Context integration

Final method is the use of React Context to facilitate the WebSocket communication. Let's go through the implementation and then discuss on why this is preferred over the rest. [React Context](https://reactjs.org/docs/context.html) was introduced as a way of managing the app state without passing down props through the parent-child trees. With the recent introduction of Hooks, using Context became trivial. First, we create a context class for WebSockets, that initialize the socket connection.

```javascript
// WebSocket.js

import React, { createContext } from 'react'
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
import { updateChatLog } from './actions';

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }) => {
    let socket;
    let ws;

    const dispatch = useDispatch();

    const sendMessage = (roomId, message) => {
        const payload = {
            roomId: roomId,
            data: message
        }
        socket.emit("event://send-message", JSON.stringify(payload));
        dispatch(updateChatLog(payload));
    }

    if (!socket) {
        socket = io.connect(WS_BASE)

        socket.on("event://get-message", (msg) => {
            const payload = JSON.parse(msg);
            dispatch(updateChatLog(payload));
        })

        ws = {
            socket: socket,
            sendMessage
        }
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}
```

Note above that we also introduced two additional functionalities.

(1) Sending socket messages
The `emit` function is encapsulated as functions with definitive names. For example, `sendMessage` would essentially emit a socket message as follows,

```
event: events://send-message
payload: <message content>
```

(2) Recieving socket messages
All recieving socket messages are mapped to respective Redux actions. Since the WebSocket context will be used inside the Redux provider, it would have access to Redux `dispatch` method. 

This implementation would seem an overkill at a glance and overly similar to the first method we discussed above. But there are few key differences that adds great value in the long run.
- The intiation of the WebSocket works as a part of the React cycle. In the case of socket failure we could easily handle or provide feedback to the user. This can be handled centrally.
- For a given event, there will only be one event binding. Since each event maps to a Redux action there are no reptitive bindings by individual components. When app scales, this prevents alot of head scratches.
- All socket actions are wrapped in functions allowing firm control on the structure of the payload and validations on the parameters. 
- All socket related code is available centrally at one location. Although I added this to the pros list, in certain conditions (ex: micro-frontends) this could be an issue. For a majority of cases, this would stand correct as an advantage.

With these above features, the context based integration fits well in saclability as well as maintainailibty of the codebase. Now that we have the `WebSocketContext` created, let's explore how we can use it functionally.

```javascript
// actions.js

export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST"
export const UPDATE_CHAT_LOG = "UPDATE_CHAT_LOG"

export function updateChatLog(update){
    return {
        type: UPDATE_CHAT_LOG,
        update
    }
}
```

```javascript
// App.js
import WebSocketProvider, { WebSocketContext } from './WebSocket';

// ....

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
```

As shown above, usage of the context based integration is clean. The WebSocket context can be accessed anywhere in the app using the `useContext` hook and all the included functionality will be available. Addtionally, a real-world application would also will need to handle the instances of socket disconnecting, reconnecting, and handling client exit. These instances can easily be added into the `WebSocketContext`, leaving the rest of the application clean.

## Conclusion

In this guide we discussed the different practical approaches in integrating WebSockets to an existing React+Redux web app. We brefly outlined three different patterns, and explored their strengths and weaknesses. However, for a scalable and maintaiable implementation, the React Context based approach is prefered.

