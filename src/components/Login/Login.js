

import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';



function Login() {
 

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
  })

  initializeLoginFramework();

  //Context Api
  const [loggedInUser, setLoggedInUser] = useContext(UserContext); 
  //State and Location for ProtectedRoute
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      console.log(res);
      handleResponse(res, true);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then (res => {
      handleResponse(res, false);
    })
  }


  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    } 
  }

  
  
  // Input Field Validation
  const handleBlur = (e) => {
    console.log(e.target.name, e.target.value);
    let isFieldValid = true;
    if (e.target.name === 'email') {
      const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      isFieldValid = isEmailValid;
      console.log('Email Valid');
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6; 
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
      
    }

    if (isFieldValid) {
      const newUserInfo = { ...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      console.log(user);
    }
  }

  //Sign up or Sign in by Submit button for Authentication by Email and Password
  const handleSubmit = (e) => {
    
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }

 

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> : <button onClick={googleSignIn}>Sign in with Google</button>
      }
      <span>  </span>
      <button onClick={fbSignIn}>Sign in with Facebook</button>

      {
        user.isSignedIn &&
        <div>
          <p>Welcome {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <div>
        <h2>Own Authentication</h2>
        
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
        <label htmlFor="newUser">New User Sign Up</label>
        
        <form onSubmit={handleSubmit}>
          {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your name" autoComplete='username' />}
          <br />
          <input type="text" onBlur={handleBlur} name="email" placeholder="Email ID" autoComplete='email' required />
          <br />
          <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Password" autoComplete='current-password' required />
          <br />
          <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
        </form>
        <p style={{ color: 'red' }}>{user.error}</p>

        {user.success && <p style={{ color: 'green' }}> User {newUser ? 'created' : 'logged in'} successfully.</p>}
      </div>

    </div>
  );
}

export default Login;
