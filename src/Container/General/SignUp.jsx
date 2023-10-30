import React from "react";
import { useDispatch } from 'react-redux';
import { REGISTER_SUCCESS } from "../../Actions"
import AuthService from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpHandler = async () => {
    let response = await AuthService.register();

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.token,
    });
    
    navigate("/login");
  };

return(
    <div className="container-fluid container-p-y flex-1 d-flex align-items-center py-5">      
        <div className="card w-100 m-auto loginBox">
          <div className="card-header h4 text-left bg-lite-style-1 py-3 d-flex align-items-center justify-content-between">
           <span>Sign Up</span><i className="fa-solid fa-user-plus"></i>
          </div>
          <div className="card-body">
            <div className="form-center">
              <div className="form-group">
                <label for="email" className="d-block text-left">Email Address <span className="req">*</span> :</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label for="username" className="d-block text-left">User Name <span className="req">*</span> :</label>
                <input type="text" className="form-control" id="username"  value=""/>
              </div>
              <div className="form-group">
                <label for="number" className="d-block text-left">Phone No <span className="req">*</span> :</label>
                <input type="text" className="form-control" id="number"  value=""/>
              </div>
              <div className="form-group">
                <label for="pwd" className="d-block text-left">Password <span className="req">*</span> :</label>
                <input type="password" className="form-control" id="pwd" value="" />
              </div>
              <div className="form-group">
                <label for="ConfirmPwd" className="d-block text-left">Confirm Password <span className="req">*</span> :</label>
                <input type="password" className="form-control" id="ConfirmPwd" value=""/>
              </div>
              <div className="form-group text-center">
                Already Have Account ? <Link to="/login">Sign In</Link>
              </div>

              <div className="btnWrap">
                <button type="submit" className="btn btn-primary w-100" onClick={() => signUpHandler()}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>          
      </div>
    </div>
  );
};

export default SignUp;