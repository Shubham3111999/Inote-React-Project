import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUpNewUser(props) {
  const [credential, setcredential] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (credential.password !==credential.cpassword){      // confirm password need to same as password  
      props.changeAlert("Confirm Password Doesn't Match", "danger")
      return;
     }

    const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }),
    });
    const json = await response.json();
    console.log(json);

    if(json.success){
      props.changeAlert("Sign In success", "success")
      localStorage.setItem("token", json.authToken);
      navigate("/");                                     // navigate to "/" this end point

    } else{
      props.changeAlert("Invalid Details", "danger")
    }


  }

  const onChange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })

  }
  return (
    <div className='container'>
      <h1 className='mb-4'>Create New Account </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUpNewUser
