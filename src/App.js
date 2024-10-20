import { useEffect, useState } from 'react';

import Header from './components/Header';
import Form from './components/RegisterForm';
import LoginForm from './components/LoginForm';
// import Table from './components/Table';

// import ToastRender from './components/ToastRender.js'

import './App.css';


function App({ authState, setAuthState }) {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(1);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('users') === null || localStorage.getItem('users') === undefined) {
      localStorage.setItem('users', JSON.stringify([]));
    }

    setUsers(JSON.parse(localStorage.getItem('users')));
  }, [])

  const loginUser = (user) => {
    const userObject = users.find((item) => item.email === user.email);
    console.log(users);
    // return userObject ? userObject.password === user.password : false;
    return userObject ? [userObject.password === user.password, userObject.fName] : false;

  }

  const login = (user) => {

    let found = false;

    if (users.length !== 0) {

      users.map((item) => {

        if (item.email === user.email) {

          if (item.password === user.password){

            found = true;

          }
        }
      })
    }
    return found;
  }

  const addUser = (user) => {
    const id = Math.floor(Math.random() * 10000) + 1;

    const newUser = { id, ...user };

    const usersFromStorage = JSON.parse(localStorage.getItem('users'));

    const updatedUsers = [...usersFromStorage, newUser];

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setUsers(JSON.parse(localStorage.getItem('users')));

    setUserCount((prev) => prev + 1);

  };

  const showLoginForm = () => {
    setShowLogin(!showLogin);
  }

  const checkUserExists = ({ email }) => {

    for (const user of users) {
      if (user.email === email) {
        return true;
      }
    }

    return false;

  };

  return (
    <div className="App">
      <Header showLogin={showLogin} setShowLogin={showLoginForm}/>

      {showLogin ? (
        <LoginForm addUser={loginUser} checkUserExists={checkUserExists} authState={authState} setAuthState={setAuthState}/>
      ): (
        <Form addUser={addUser} checkUserExists={checkUserExists} users={users} setShowLogin={setShowLogin}/>
      )}

      <footer className="main-footer">
						<p>Copyright &copy; 2024</p>
      </footer>

    </div>
  );
}

export default App;
