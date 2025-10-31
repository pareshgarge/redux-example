🧠 1. What is Redux?

Redux is a state management library.
It helps manage application-wide state — data that many components need to access or modify.

Think of it as a central store where all your app’s data lives.

🧩 Redux Core Concepts
Concept	Meaning
Store	The single source of truth (holds the app state).
Action	A plain JS object that describes what happened (e.g., { type: 'INCREMENT' }).
Reducer	A pure function that takes the current state and an action → returns the new state.
Dispatch	A method to send actions to the store.
Selector	A function to read data from the store.
⚙️ 2. How Redux Data Flows

UI triggers an action

Dispatch sends that action to the reducer

The reducer updates the store

Components subscribed to the store re-render with new data

UI → dispatch(action) → reducer → newState → UI updates

⚡ 3. Setup Redux in React + Vite
Step 1: Create a Vite React App
npm create vite@latest redux-demo -- --template react
cd redux-demo
npm install

Step 2: Install Redux Toolkit & React Redux

Redux Toolkit (RTK) is the modern, official way to use Redux.

npm install @reduxjs/toolkit react-redux

📁 Folder Structure
src/
 ├── app/
 │    └── store.js
 ├── features/
 │    └── user/
 │         ├── userSlice.js
 ├── App.jsx
 └── main.jsx

🧠 2. Redux Store Setup
src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

👤 3. Create User Slice
src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  userId: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.username = '';
      state.userId = '';
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

🏁 4. Wrap App with Provider
src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

🧾 5. Create UI for Setting & Displaying User Data
src/App.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logout } from './features/user/userSlice';

function App() {
  const [usernameInput, setUsernameInput] = useState('');
  const [userIdInput, setUserIdInput] = useState('');

  const dispatch = useDispatch();
  const { username, userId, isLoggedIn } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameInput.trim() && userIdInput.trim()) {
      dispatch(setUser({ username: usernameInput, userId: userIdInput }));
      setUsernameInput('');
      setUserIdInput('');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Redux User Info Example</h1>

      {!isLoggedIn ? (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="Enter Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="text"
            placeholder="Enter User ID"
            value={userIdInput}
            onChange={(e) => setUserIdInput(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button type="submit">Set User</button>
        </form>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h2>Welcome, {username}!</h2>
          <p>User ID: {userId}</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;

🚀 6. Run the App
npm run dev


Then open the URL shown (usually http://localhost:5173/).

You can now:

Enter a username & userId → store updates in Redux

Displayed values come from the Redux store

Click Logout → resets Redux state

🧩 7. What You Learned

✅ How to create a Redux store using Redux Toolkit
✅ How to use useSelector and useDispatch in React components
✅ How to update and reset state in Redux
✅ How to manage user authentication-like data globally

💡 6. Key Points to Remember

✅ Redux Toolkit simplifies Redux — no need for manual action creators or combining reducers.
✅ State is immutable — reducers must return new state objects (RTK uses Immer internally).
✅ Use useSelector to read from the store.
✅ Use useDispatch to trigger state changes.