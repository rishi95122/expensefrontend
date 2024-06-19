import React, { useContext, useEffect, useState } from 'react'
import './history.css'
import { AuthContext } from '../../context/AuthContext'
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import {BarLoader} from "react-spinners"
import { ToastContainer, toast } from 'react-toastify';
const History = () => {
const {historyData,currentUser,getData,total,loader,setLoader}=useContext(AuthContext)

function handleClick(id){
  setLoader(true)
  axios.post(`${import.meta.env.VITE_BACK_API}/api/expenses/delete`,{
    username:currentUser.username,
    id:id
  }).then(()=>{
   getData(currentUser.username)
   toast.warn("Deleted")

  })
  setLoader(false)
}


  return (
    <div className='history'>
      <h2>History</h2>
        <div className='table'>
          <table>
            <tr>
              <th>Date</th>
              <th>Expense Name</th>
              <th>Category</th>
              <th>Amount</th>
             
              <th> </th>
            </tr>
                  {
                 !loader ?  (currentUser&& historyData.map((item,idx)=>{
                      return <tr key={idx} >
                        <tr >
                        <td >{item.date}</td>
                        <td >{item.name}</td>
                        <td >{item.category}</td>
                        <td >{item.amount}</td>
                        </tr>
                        <div className='del-btn' onClick={()=>handleClick(item.id)}>
                        <MdDelete />
                        </div>
                       
                        </tr>
                    })) : <div className='loader'> <BarLoader color="#36d7b7" /></div>
                  }
                  <div className='sum'>
                    Sum : <p> ₹ {total}</p>
                  </div>

          </table>
        </div>
        <ToastContainer theme="dark" />
    </div>
  )
}

export default History