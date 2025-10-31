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
