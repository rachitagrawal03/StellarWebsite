import { useContext, useState } from "react";
import "./css/LoginSignUp.css"
import { ShopContext } from "../context/ShopContext";
import axios from "axios"

const LoginSignUp = () => {

    const {url, setToken} = useContext(ShopContext);

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: "",
    })

    const changeHandler = (e) => {
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
    }

    const handleFormSubmit = async (event) =>{
        event.preventDefault();
        console.log("handleFormSubmit function executed", formData);

        let newUrl = url;
        if(state === "Login"){
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/signup"
        }
        const response = await axios.post(newUrl, formData)
        if(response.data.success){
            localStorage.setItem('auth-token', response.data.token);
            window.location.replace("/");
        }else{
            alert(response.data.message)
        }

        // let responseData;
        // await fetch('https://shopperwebsite-gn7e.onrender.com/login', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         "Content-Type": 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // }).then((res)=> res.json()).then((data) => responseData = data)

        // if(responseData.success){
        //     localStorage.setItem('auth-token', responseData.token);
        //     window.location.replace("/");
        // }else{
        //     alert(responseData.errors)
        // }
    }
    
    // const signup = async (event) =>{
    //     event.preventDefault();
    //     let newUrl = url + "/api/user/signup";
    //     console.log("Sign up function executed", formData);   
    //     const response = await axios.post(newUrl, formData)

    //     // let responseData;
    //     // await fetch('https://shopperwebsite-gn7e.onrender.com/signup', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         Accept: 'application/json',
    //     //         "Content-Type": 'application/json',
    //     //     },
    //     //     body: JSON.stringify(formData),
    //     // }).then((res)=> res.json()).then((data) => responseData = data)

    //     // if(responseData.success){
    //     //     localStorage.setItem('auth-token', responseData.token);
    //     //     window.location.replace("/");
    //     // }else{
    //     //     alert(responseData.errors)
    //     // }
    // }

    return (
        <form className="loginSignUp" onSubmit={handleFormSubmit}>
            <div className="loginSignUp-container">
                <h1>{state}</h1>
                <div className="loginSignUp-fields">
                    {state === "Sign Up" && <input type="text" placeholder="Name" name="name" value={formData.name} onChange={changeHandler} required/>}
                    
                    <input type="email" placeholder="Email Id" name="email" value={formData.email} onChange={changeHandler} required/>
                    <input type="password" placeholder="Password" name="password" value={formData.password} 
                    onChange={changeHandler} required/>
                </div>
                <button type="submit">Continue</button>
                {state==="Sign Up" ? <p className="loginSignUp-login">Already have an account? <span onClick={()=>setState("Login")}>Login here</span></p> : <p className="loginSignUp-login">Create an account? <span onClick={()=>setState("Sign Up")}>Click here</span></p>}
                
                <div className="loginSignUp-agree">
                    <input type="checkbox" id="" required/>
                    <p>By continue, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </form>        
    )
}

export default LoginSignUp;