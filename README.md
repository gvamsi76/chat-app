# Chat Application

This is a real-time chat application built using **Socket.io** and **Express.js** on the backend, and **React** on the frontend. The app allows multiple users to join chat rooms and exchange messages in real-time.

## Features

- **Real-time Communication**: Instant messaging powered by **Socket.io**.
- **Multiple Rooms**: Users can join different chat rooms.
- **Username Support**: Each user has a username that is visible to others in the chat.
- **Broadcast Messages**: Notifications when users join or leave a chat room.
- **Responsive Design**: Built using **React** for a smooth user experience.

## Tech Stack

### Backend:
- **Node.js**: JavaScript runtime for server-side scripting.
- **Express.js**: Web framework for Node.js to build the backend REST APIs.
- **Socket.io**: Library for enabling real-time, bidirectional communication between the server and clients.

### Frontend:
- **React**: Frontend library for building a responsive user interface.
- **Socket.io Client**: To connect the React frontend with the backend for real-time communication.
  
### Deployment:
- **Heroku/Vercel**: For deploying the application (if applicable).

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/gvamsi76/chat-app.git
   cd chat-app
   ```

2. **Install dependencies**:

   For the **backend** (inside the `server` folder):

   ```bash
   cd server
   npm install
   ```

   For the **frontend** (inside the `client` folder):

   ```bash
   cd client
   npm install
   ```

### Running the App Locally

#### Start the Backend (Server)

1. Go to the `server` directory:

   ```bash
   cd server
   ```

2. Run the backend server:

   ```bash
   npm start
   ```

   This will start the server on `http://localhost:5000`.

#### Start the Frontend (Client)

1. Go to the `client` directory:

   ```bash
   cd client
   ```

2. Run the React frontend:

   ```bash
   npm start
   ```

   The React app will be available at `http://localhost:3000`.

### Running Both (Simultaneously)

If you want to run both the frontend and backend simultaneously, you can run them in separate terminal windows:
1. One terminal for the backend: `cd server && npm start`
2. One terminal for the frontend: `cd client && npm start`

Alternatively, you can create a `concurrently` script in the root directory that runs both.

```bash
npm install concurrently
```

Add this to your `package.json`:

```json
"scripts": {
  "dev": "concurrently \"npm start --prefix server\" \"npm start --prefix client\""
}
```

Now you can run:

```bash
npm run dev
```

This will start both the frontend and backend concurrently.



### Key Files

#### Backend (Server):

- **`server/index.js`**: The entry point for the backend server, sets up the **Express.js** server and integrates **Socket.io** to handle WebSocket connections for real-time communication.

- **Socket.io Events**:
  - **connection**: Triggered when a user connects to the server.
  - **disconnect**: Triggered when a user leaves the chat.
  - **join_room**: Handles a user joining a specific chat room.
  - **send_message**: Handles messages sent to the room.

#### Frontend (Client):

- **`client/src/App.js`**: The main React component that sets up routing and handles the chat logic.
- **`client/src/components/ChatRoom.js`**: A component that displays the chat interface and sends/receives messages via **Socket.io**.
- **`client/src/components/Join.js`**: A component where users can enter their username and select a room to join.

## How to Use

1. **Enter Username and Room**:
   - Navigate to the join page (e.g., `http://localhost:3000/`) and enter a username and a room name to join.
   
2. **Send Messages**:
   - Once in a room, type your message and hit send. Messages from all users in the room will appear in real-time.

3. **Receive Messages**:
   - Messages from other users will be broadcasted to all participants in the room in real-time.

4. **Notifications**:
   - The app will notify when a user joins or leaves the chat room.




## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
