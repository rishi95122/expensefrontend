import React, { useContext, useEffect } from 'react'
import "./Homepage.css"
import { SiPivotaltracker } from "react-icons/si";
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import History from '../History/History';
import Categories from '../Categories/Categories';

const Homepage = () => {
 
  return (
    <div className='homepage'>
      <div className='expense-logo'>
      <SiPivotaltracker  size={80} />
      </div>
        <h1>Expense Tracker</h1>

        <div>
        <h4>Add Expense</h4>
          <ExpenseForm />
        </div>
        <div>
          <Categories />
        </div>
        <div className=''>
          <History />
        </div>
    </div>
  )
}

export default Homepage