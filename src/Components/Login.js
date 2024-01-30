import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [credential, setcredential] =useState({email:"",password:""});
    let navigate = useNavigate();

   let handleSubmit=async (e)=>{
    
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credential.email,password:credential.password}),
          });
          const json= await response.json();
          console.log(json);

          if(json.success){
            
            props.changeAlert("Log in success", "success")
            localStorage.setItem("token", json.authToken);          //set auth is local
            navigate("/");                                         // navigate to "/" this end point

          } else{
            
            props.changeAlert("Invalid Credential", "danger")
          }

    }

    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    
      }
    return (
        <div>
            <h1 className='mb-4'>Please Log In To Continue </h1>
            <form onSubmit={handleSubmit}>                          
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credential.email} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credential.password} id="password" onChange={onChange}/>
                </div>
              
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form >
        </div>
    )
}

export default Login
