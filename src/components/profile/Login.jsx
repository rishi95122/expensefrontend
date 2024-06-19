/* eslint-disable no-undef */

import axios from "axios"
import "./login.css"
import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from "react-router"
import { AuthContext } from "../../context/AuthContext"
import { ToastContainer, toast } from 'react-toastify'
import { BarLoader } from "react-spinners"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {setCurrentUser,getData,loader,setLoader}=useContext(AuthContext)
const nav=useNavigate()

console.log(import.meta.env.VITE_BACK_API)

  const onButtonClick = () => {

    setLoader(true)
    if(email.length<=0 || password.length <=0)
      { setError("Check Inputs")
        return;
      }

    axios.post(`${import.meta.env.VITE_BACK_API}/api/auth/login`,{
      email:email.toLowerCase(),
      password:password
    }).then((data)=>{
      toast.success("Logged In")
      localStorage.setItem("user",JSON.stringify(data.data))
      setCurrentUser(data.data)
      console.log(data.data.username)
      getData(data.data.username)
      setLoader(false)
      nav("/")
    }).catch((err)=>{
      setLoader(false)
      setError(err.response.data)
    })

  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
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
     
      {loader ?<div className='loader'> <BarLoader color="#36d7b7" /></div>: <label className="errorLabel">{error}</label>}
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    
    </div>
  )
}

export default Login