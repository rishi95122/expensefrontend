
import "./login.css"
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router"

import { AuthContext } from "../../context/AuthContext"
import { BarLoader } from "react-spinners"
const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const[err,setErr]=useState("")
  const nav=useNavigate()
  const {currentUser,loader,setLoader}=useContext(AuthContext)

  useEffect(()=>{
    if(currentUser)
      nav("/")
    },[])

  const onButtonClick = () => {
    setLoader(true)
    if(email.length<=0 || password.length <8|| username.length<3)
      return;

   const res= axios.post(`${import.meta.env.VITE_BACK_API}/api/auth/register`,{
    email:email.toLowerCase(),
    username:username.toLowerCase(),
    password:password
  }).then(()=>{
  setLoader(false)
    nav("/login")

  }).catch((e)=>{
    setLoader(false)
setErr(e.response.data)
  })
  
  }
console.log(err)
  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Signup</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
      
      </div>
      <br></br>
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Enter your Username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
    
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
     
      </div>
   
      <br />
      {loader ?<div className='loader'> <BarLoader color="#36d7b7" /></div>:       <label className="errorLabel">{err}</label>}

      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'} />
      </div>
      
    </div>
  )
}

export default Register