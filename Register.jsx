import React, { useState } from "react";

export const Register = (props) => {
    //Each of these state variables is initialized to an empty string.
    //useState hook returns the current value of the state variable and calls the function to update the state variable 
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
        try{
            const response = await (await fetch('http://localhost:3000/api/signUp', {method:'POST', 
            headers:{'Content-Type': 'application/json'}, 
            body: JSON.stringify({email, pass, name}), 
            mode:'cors'})).json();
            console.log(response)
        }catch (error){
        console.log(error)
    }
    }
    //handle the submission of a form, by stopping the refresh of the form submission 
    //and then logging data to the console to update state variables
    
    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            //renders an HTML label and an input element that together create a form field
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> 
    </div>
    )
}