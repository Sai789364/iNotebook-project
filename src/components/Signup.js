import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

const Signup = () => {
  const [credentials,setcredentials]=useState({name:"",email:"",password:"",epassword:""})
  const navigate = useNavigate();

  const {name,email,password}=credentials;

  const handlechange= async (e)=>{
      e.preventDefault();
      const response = await fetch(
          "https://i-notebook-project-backend.vercel.app/api/auth/createuser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }, 
            body: JSON.stringify({name,email,password}),
          }
        );
        const json=await response.json();
        console.log(json)
        if(json.success){
          //redirect
          localStorage.setItem('token',json.authtoken)
          navigate("/")
        }
        else{
          alert("Invalid email or password")
        }
  }

  const onchange=(e)=>{
      setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <form onSubmit={handlechange}>
        <h2 className="my-4">Signup to Enter into the iNotebook</h2>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onchange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="epasswoed" className="form-label">RePassword</label>
    <input type="password" className="form-control" id="epassword" name="epassword" onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup;
