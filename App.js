import React, { useState } from "react";
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";

function App() {
  const [currentForm, setCurrentForm] = useState('login'); // initializes a state variable called currentForm using the useState hook. 
  //The initial value of currentForm is 'login'. The setCurrentForm function is used to update the value of currentForm.

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  //the toggleForm function is used to update the value of the currentForm state variable in response to user input
  //(by clicking the "Register" button), the onFormSwitch prop is called with a new value for formName.

  return (
    //renders the Login or Register component based on the value of the currentForm state variable
    //which then allows onFormSwitch prop to allow the user to switch between the two forms.
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;