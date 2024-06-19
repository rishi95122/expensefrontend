import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [loader,setLoader]=useState(false)
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [historyData, setHistoryData] = useState([]);
  let [total, setTotal] = useState(0);

  const categoryAmount = [
    { name: "Shopping", amount: 0 },
    { name: "Entertainments", amount: 0 },
    { name: "Bills", amount: 0 },
    { name: "Food", amount: 0 },
    { name: "Transport", amount: 0 },
    { name: "Health", amount: 0 },
    { name: "Education", amount: 0 },
    { name: "Other", amount: 0 },
  ];

  const getData = (username) => {
setLoader(true)
     axios.post(`${import.meta.env.VITE_BACK_API}/api/expenses/get`, { username: username })
      .then((res) => {
        setHistoryData(res.data);
        setLoader(false)
      });
    
  };
console.log(loader)
  useEffect(() => {
    const totalAmount = historyData.reduce(
      (total, item) => total + +item.amount,
      0
    );
    setTotal(totalAmount);
   
  }, [getData]);

 
  useEffect(() => {
    getData(currentUser ? currentUser.username : "");
  }, []);
  return (
    <AuthContext.Provider
      value={{
        categoryAmount,
        loader,
        setLoader,
        getData,
        total,
        currentUser,
        setCurrentUser,
        historyData,
        setHistoryData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
