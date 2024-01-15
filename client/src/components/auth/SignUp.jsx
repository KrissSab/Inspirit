import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authStyles from './authStyles.module.css';
import validateInput from './validation';
import URL from '../../config';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validateInput(name, value)) {
      console.log(`"Cool ${name}"`);
    }
  };

  const submitForm = async () => {
    if (
      validateInput('username', formData.username) &&
      validateInput('email', formData.email) &&
      validateInput('password', formData.password) &&
      form.formData.password == formData.confirmPassword
    ) {
      try {
        const response = await axios.post(
          URL + '/auth/registration',
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.status == 200) {
          navigate('/');
          console.log('Successful registration');
        }
      } catch (error) {
        console.log('Internal Server Error', error);
      }
    } else {
      console.log(
        'Error with data',
        formData,
        formData.password == formData.confirmPassword,
      );
    }
  };

  return (
    <div className={authStyles.authContainer}>
      <p className={authStyles.authFormLabel}>Create your account</p>
      <form className={authStyles.formContainer}>
        <div className={authStyles.inputContainer}>
          <input
            name="username"
            type="text"
            className={authStyles.authInput}
            placeholder=" "
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="username" className={authStyles.authLabel}>
            Username
          </label>
        </div>
        <div className={authStyles.inputContainer}>
          <input
            name="email"
            type="text"
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
        <div className={authStyles.inputContainer}>
          <input
            name="confirmPassword"
            type="password"
            className={authStyles.authInput}
            placeholder=" "
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword" className={authStyles.authLabel}>
            Confirm password
          </label>
        </div>
      </form>
      <button className={authStyles.submitButton} onClick={submitForm}>
        Sign Up
      </button>
      <div className={authStyles.linkContainer}>
        <Link to="/login" className={authStyles.authLinks}>
          already have an account?
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
