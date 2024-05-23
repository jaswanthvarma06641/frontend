import React, {useState} from 'react'
import { API_Path } from '../../data/ApiPath';

const Register = ({showLoginHandler}) => {
  const [username, setUsername]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [error, setError]=useState("");
  const [loading,setLoading]=useState(true);




  const handleSubmit= async(e)=>{
    // to prevent re loading
    e.preventDefault();
    try {
      const response=await fetch(`${API_Path}/vendor/register`, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({username,email,password})
      });
      const data=await response.json();
      if (response.ok){
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor registerd succesfully")
        showLoginHandler()
      }
    } catch (error) {
      console.error("registration fail",error)
      alert("registration fail")
    }
  }
  return (
    <div className="registerSection">
        <form className='authForm' onSubmit={handleSubmit}>
      <h3>Vendor Register</h3>
      <label>Username</label>
        <input type='text'name='username' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='enter your name'/><br/>
        <label>Email</label>
        <input type='text' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email'/><br/>
        <label>Password</label>
        <input type='text' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password'/><br/>
        <div className="btnSubmit">
            <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Register
