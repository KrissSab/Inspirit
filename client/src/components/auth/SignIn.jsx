import React from 'react';
import { Link } from 'react-router-dom';
import authStyles from './authStyles.module.css';

const SignIn = () => {
  return (
    <div className={authStyles.authContainer}>
      <p className={authStyles.authFormLabel}>Login to personal account</p>
      <form className={authStyles.formContainer}>
        <div className={authStyles.inputContainer}>
          <input
            type="text"
            className={authStyles.authInput}
            placeholder=" "
            id="email"
          />
          <label htmlFor="email" className={authStyles.authLabel}>
            Email
          </label>
        </div>
        <div className={authStyles.inputContainer}>
          <input
            type="password"
            className={authStyles.authInput}
            placeholder=" "
            id="password"
          />
          <label htmlFor="password" className={authStyles.authLabel}>
            Password
          </label>
        </div>
      </form>
      <button className={authStyles.submitButton}>Sign In</button>
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
};

export default SignIn;
