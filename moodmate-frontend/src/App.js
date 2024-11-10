import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Separate states for login and signup forms
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const flip = () => setIsFlipped(true);
  const flipAgain = () => setIsFlipped(false);

  const togglePasswordVisibility = (event) => {
    const passwordInput = event.target.previousElementSibling;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      event.target.className = 'fa fa-eye';
      event.target.style.color = 'cyan';
    } else {
      passwordInput.type = 'password';
      event.target.className = 'fa fa-eye-slash';
      event.target.style.color = 'white';
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: loginEmail,
        password: loginPassword,
      });
      setMessage('Login successful!');
      console.log('Token:', response.data.token); // Optionally store the token
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email: signupEmail,
        password: signupPassword,
      });
      setMessage('Registration successful! You can now log in.');
      flipAgain();
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="box">
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        
        {/* Login Box */}
        <div className="box-login">
          <form onSubmit={handleLogin}>
            <h1>LOGIN</h1>
            <div className="email-login">
              <input
                className="inpt"
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <i className="fa fa-envelope"></i>
            </div>

            <div className="password-login">
              <input
                className="inpt"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <i className="fa fa-eye-slash" onClick={togglePasswordVisibility}></i>
            </div>

            <div className="forget">
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">Remember me</label>
              <a href="#">Forget Password?</a>
            </div>
            <button type="submit" className="btn">LOGIN</button>
            <p>Don't have an account? <a href="#" onClick={flip}>Sign Up</a></p>
          </form>
        </div>

        {/* Signup Box */}
        <div className="box-signup">
          <form onSubmit={handleSignup}>
            <h1>SIGN UP</h1>
            <div className="user-signup">
              <input
                className="inpt"
                type="text"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <i className="fa fa-user"></i>
            </div>

            <div className="email-signup">
              <input
                className="inpt"
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <i className="fa fa-envelope"></i>
            </div>

            <div className="password-signup">
              <input
                className="inpt"
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <i className="fa fa-eye-slash" onClick={togglePasswordVisibility}></i>
            </div>

            <div className="forget">
              <input type="checkbox" id="checkbox1" />
              <label htmlFor="checkbox1">Remember me</label>
              <a href="#">Forget Password?</a>
            </div>
            <button type="submit" className="btn">SIGN UP</button>
            <p>Already have an account? <a href="#" onClick={flipAgain}>Log In</a></p>
          </form>
        </div>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
