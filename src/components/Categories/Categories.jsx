import React, { useContext, useEffect, useState } from 'react'
import { category } from '../../store/categories'
import "./Categories.css"
import { AuthContext } from '../../context/AuthContext'
const Categories = () => {
  const {categoryAmount,historyData,getData}=useContext(AuthContext)
  const [filterCategory, setFilterCategory] = useState([]);
  useEffect(()=>{
  
    const sumByCategory = historyData.reduce((acc, item) => {
      if (acc[item.category]) {
        acc[item.category] += +item.amount;
      } else {
        acc[item.category] = +item.amount;
      }

      return acc;
    }, {});
    const newData = categoryAmount
      .map((item) => {
        if (!sumByCategory[item.name]) return;
        return { name: item.name, amount: sumByCategory[item.name] };
      })
      .filter((item) => item !== undefined);

    setFilterCategory(newData);
  },[getData])


  return (
    <div className='categories'>
        <h2>Categories</h2>
        <div className='category'> 
            {
              filterCategory.map((item,idx)=>{
                return <div key={idx} className='single-cat'> <p>{item.name}</p> <p>₹ {item.amount}</p></div>
              })
            }
        </div>
    </div>
  )
}

export default Categories