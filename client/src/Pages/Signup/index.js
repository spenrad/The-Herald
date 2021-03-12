import React, { useState } from "react";
import "./style.css";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import bg from "../../Components/bgVideo.mp4";

function Signup() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const history = useHistory();

  const register = function () {
    API.registerUser({
      username: registerUsername,
      password: registerPassword,
    }).then(() => {
      history.push("/login");
    });
  };

  return (
    <div className="registerContainer">

      {/* Background video */}
      <video autoPlay muted loop id="bgVideo">
        <source src={bg} type="video/mp4" />
      </video>

      <div className="content">
        <div className="info div-box">
          <h2><span className="infoTitle">WELCOME TO THE HERALD</span></h2>
          <h3>YOUR HUB FOR GLOBAL NEWS</h3>
        </div>

        <div className="div-box">
          <h1>Register</h1>
          <input
            className="signForm"
            placeholder="Username"
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <input
            className="signForm"
            type="password"
            placeholder="Password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button className="btn" onClick={register}>Submit</button>
          <hr />
          <a href="/login" id="homebutts"><h6 className="acctLink">Already Registered?</h6></a>
        </div>
      </div>
    </div>
  );
}
export default Signup;
