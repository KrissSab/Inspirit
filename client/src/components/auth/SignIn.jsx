import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authStyles from './authStyles.module.css';
import axios from 'axios';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setFormData({ ...formData, [name]: value });
    }
    if (name === 'password') {
      setFormData({ ...formData, [name]: value });
    }
  };

  const requestForLoging = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status == 200) {
        navigate('/');
        console.log('Successesful login');
      } else {
        console.log('Login failed');
        console.log(response.status);
      }
    } catch (error) {
      console.log('Network error: ', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      console.log('LogIn fields are empty');
    } else {
      requestForLoging();
    }
  };

  return (
    <div className={authStyles.authContainer}>
      <p className={authStyles.authFormLabel}>Login to personal account</p>
      <form className={authStyles.formContainer}>
        <div className={authStyles.inputContainer}>
          <input
            name="email"
            type="email"
            className={authStyles.authInput}
            placeholder=" "
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="email" className={authStyles.authLabel}>
            Email
          </label>
        </div>
        <div className={authStyles.inputContainer}>
          <input
            name="password"
            type="password"
            className={authStyles.authInput}
            placeholder=" "
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="password" className={authStyles.authLabel}>
            Password
          </label>
        </div>
      </form>
      <button className={authStyles.submitButton} onClick={handleSubmit}>
        Sign In
      </button>
      <div className={authStyles.linkContainer}>
        <Link to="/forgetpassword" className={authStyles.authLinks}>
          Forget password?
        </Link>
        <Link to="/register" className={authStyles.authLinks}>
          Registration
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
