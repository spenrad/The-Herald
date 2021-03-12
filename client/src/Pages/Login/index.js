import React, { useState } from "react";
import "./style.css";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import bg from "../../Components/bgVideo.mp4";

function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const history = useHistory();

  const login = function () {
    API.loginUser({
      username: loginUsername,
      password: loginPassword,
    }).then(() => {
      history.push("/map");
    });
  };

  return (
    <div className="signUpContainer">

      {/* Background video */}
      <video autoPlay muted loop id="bgVideo">
        <source src={bg} type="video/mp4" />
      </video>

      <div className="content">
        <div className="login div-box content">
          <h1>Login</h1>
          </div>
          <div className="div-box"><input
            className="signForm"
            placeholder="Username"
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            className="signForm"
            type="password"
            placeholder="Password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <button className="btn" onClick={login}>Submit</button>
          <hr />
          <a href="/" id="homebutts"><h6 className="acctLink">Don't Have An Account?</h6></a>
        </div>
      </div>
    </div>
  );
}

export default Login;
