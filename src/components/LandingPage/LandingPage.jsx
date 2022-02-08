import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Button} from "@mui/material";

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();
  

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h2>Already a Member?</h2>
            <Button
                variant="contained"
                style={{
                  backgroundColor: "#0583f2",
                  color: "White",
                  marginLeft: "5%",
                }}
                onClick={onLogin}
              >
                Login
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
