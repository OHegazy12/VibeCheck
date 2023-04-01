import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();//submitting a form will cause the page to refresh, we can stop that by calling e.preventDefault()
    //     console.log(email);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
        try{
            const response = await (await fetch('http://localhost:3000/api/login', {method:'POST', 
            headers:{'Content-Type': 'application/json'}, 
            body: JSON.stringify({email, pass, name}), 
            mode:'cors'})).json();
            console.log(response)
        }catch (error){
        console.log(error)
    }
    }


    //handle the submission of a form, by stopping the refresh of the form submission 
    //and then logging data to the console to updating state variables

    return (
        //login form
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}