import React, { useContext, useEffect, useState } from 'react'
import "./expenseform.css"
import { IoIosAddCircle } from "react-icons/io";
import { category } from '../../store/categories'
import { AuthContext } from '../../context/AuthContext';

import axios from 'axios';
const ExpenseForm = () => {
const {currentUser,getData}=useContext(AuthContext)
  const [name,setName]=useState("")
  const [amount,setAmount]=useState("")
  const [cat,setCat]=useState("Shopping")
  const [date ,setDate]=useState("")
  function uniqueId() {
    const timestamp = new Date().getTime(); 
    const randomNum = Math.floor(Math.random() * 1000000000);
    return `${timestamp}-${randomNum}`; 
  }
  function handleClick(){
      if(date.length<=0 || name.length<=0|| amount.length<=0 || cat.length<=0)
        return;
      if(!currentUser)
        return;
    const newData={
      id:uniqueId(),
      username:currentUser.username,
      name:name,
      amount:amount,
      category:cat,
      date:date
    }
     axios.post(`${import.meta.env.VITE_BACK_API}/api/expenses/add`,newData).then(()=>{
      
      getData(currentUser.username)
     
    })
    
  }

  return (
    <div className='expenseform'>
       <form>
        <input type="text" placeholder='Expense name' onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder='Amount' onChange={(e)=>setAmount(e.target.value)}/> 
        <select onChange={(e)=>setCat(e.target.value)}>
            {category.map((item,id)=><option key={id} value={item}>{item}</option>)}
        </select>
        <input type="date" onChange={(e)=>setDate(e.target.value)}/>
        <div className='addbtn' onClick={handleClick}>
        <IoIosAddCircle size={26}   />
        </div>
     
        
       </form>
    </div>
  )
}

export default ExpenseForm