import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS } from "../../Actions"
import AuthService from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const loginHandler = async () => {
    try {
      const response = await AuthService.login(
        document.getElementById("email").value,
        document.getElementById("password").value
      );
      // const response = await AuthService.login("email", "password");
      
      if (response && response.token) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.token,
        });
        
        navigate("/");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };
  return (
    <div
      className="container-fluid container-p-y flex-1 d-flex align-items-center py-5">
      <div className="card w-100 m-auto loginBox">
        <div className="card-header h4 text-left bg-lite-style-1 py-3 d-flex align-items-center justify-content-between">
          <span>Sign In</span><i class="fa-solid fa-lock-open"></i>
        </div>
        <div className="card-body">
          <div className="form-center">
            <div className="form-group">
              <label for="email" className="d-block text-left">User Name:</label>
              <input type="text" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label for="password" className="d-block text-left">Password:</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="form-group text-center">
              <a href="#">Forgot password?</a>
              <br />
               {/* Don't have an account? <Link to="/signup">Sign up</Link>  */}
              {errorMessage && (
             <div className="alert alert-danger">{errorMessage}</div>
              )}
            </div>

            <div className="btnWrap">
              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={() => loginHandler()}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;