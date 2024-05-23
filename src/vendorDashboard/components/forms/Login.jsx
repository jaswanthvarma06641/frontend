import React,{useState} from 'react'
import { API_Path } from '../../data/ApiPath';



const Login = ({ShowWelcomeHandler}) => {
  const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const loginHandler=async(e)=>{
  e.preventDefault();
  try {
    const response =await fetch(`${API_Path}/vendor/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({email,password})
    });
    const data=await response.json();
    console.log(data)
    if(response.ok){
      alert('Login success')
      localStorage.setItem('loginToken',data.token)
      setEmail("");
      setPassword("");
      ShowWelcomeHandler()
    }
    const vendorId=data.vendorId
    const vendorResponse=await fetch(`${API_Path}/vendor/single-vendor/${vendorId}`)
    const vendorData=await vendorResponse.json();
    console.log(vendorData)
    if(vendorResponse.ok){
      if (vendorData.vendor.firm.length!==0){
        const vendorFirmId=vendorData.vendorFirmId;
        const vendorFirmName=vendorData.vendor.firm[0].firmName;
        localStorage.setItem('firmId',vendorFirmId)
        localStorage.setItem('firmName',vendorFirmName)
      }
      window.location.reload()
    }
  } catch (error) {
    console.error("Login fail",error)
    alert("Login fail")
  }
}
  return (
    <div className='loginSection'>
      <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor login</h3>
          <label>Email</label>
          <input type='text' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email'/><br/>
          <label>Password</label>
          <input type='text' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password'/><br/>
          <div className="btnSubmit">
              <button type="submit">Submit</button>
          </div>
      </form>
    </div>
  )
}

export default Login
