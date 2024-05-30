import { useState } from "react";
import "./css/LoginSignUp.css"

const LoginSignUp = () => {

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    })

    const changeHandler = (e) => {
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
    }

    const login = async () =>{
        console.log("Login function executed", formData);
        let responseData;
        await fetch('https://shopperwebsite-gn7e.onrender.com/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((res)=> res.json()).then((data) => responseData = data)

        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }else{
            alert(responseData.errors)
        }
    }
    
    const signup = async () =>{
        console.log("Sign up function executed", formData);   
        let responseData;
        await fetch('https://shopperwebsite-gn7e.onrender.com/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((res)=> res.json()).then((data) => responseData = data)

        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }else{
            alert(responseData.errors)
        }
    }

    return (
        <div className="loginSignUp">
            <div className="loginSignUp-container">
                <h1>{state}</h1>
                <div className="loginSignUp-fields">
                    {state === "Sign Up" && <input type="text" placeholder="Name" name="username" value={formData.username} onChange={changeHandler}/>}
                    
                    <input type="email" placeholder="Email Id" name="email" value={formData.email} onChange={changeHandler}/>
                    <input type="password" placeholder="Password" name="password" value={formData.password} 
                    onChange={changeHandler}/>
                </div>
                <button onClick={() => {state === "Login" ? login() : signup()}}>Continue</button>
                {state==="Sign Up" ? <p className="loginSignUp-login">Already have an account? <span onClick={()=>setState("Login")}>Login here</span></p> : <p className="loginSignUp-login">Create an account? <span onClick={()=>setState("Sign Up")}>Click here</span></p>}
                
                <div className="loginSignUp-agree">
                    <input type="checkbox" id="" required/>
                    <p>By continue, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>        
    )
}

export default LoginSignUp;