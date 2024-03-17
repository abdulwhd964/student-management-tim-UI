import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/login'; // Update with your backend API URL
const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params ={
      "userName":credentials.username,
      "password":credentials.password
    }
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (response.ok) {
            console.log('Form submitted successfully!');
            //  console.log('Form submitted successfully!',await response.json());
            debugger
            const responseValue = await response.json();
            console.log("responseValue : " , responseValue);
            const token = responseValue.data;
            console.log('Object as String:', token);
            localStorage.setItem("token", token);
            navigate('/homepage');
        } else {
            debugger
            console.error('Form submission failed!');
            const errorMessage = await response.json()
            setError(errorMessage.message);
        }

    } catch (error) {
        setError(error.message);
    } finally{
       
    }
}

  return (
    <div className="container">
          <div className='heading'>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            </div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
