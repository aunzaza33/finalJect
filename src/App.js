import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react'
import Sidebaradmin from './sidebaradmin';
import Sidebaruser from './sidebaruser';
import Signin from './pages/Signin';
import Sidebardata from './component/Sidebardata';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from "axios";

function App() {
  const [admin, setadmin] = useState([]);
  const displayname = sessionStorage.getItem('displayname');
  const accountType = sessionStorage.getItem('account_type');

  useEffect(() => {
    console.log(displayname)
    console.log(accountType)
    console.log(window.location.pathname)
    getadmin();
  })
  const getadmin = async () => {
    const response = await axios.get('http://localhost:3001/getadmin');
    const jsonData = response.data;
    const foundData = jsonData.find((data) => data.name === displayname);
    if (foundData) {
      setadmin(response.name);
    }
    console.log(admin)
};
  if (!displayname) {
    if (window.location.pathname.startsWith('/repairS') || window.location.pathname.startsWith('/room')) {
      return <Sidebardata />;
    }
    else{
      return <Signin />;
    }
    
  } else {
    if (window.location.pathname.startsWith('/repairS') || window.location.pathname.startsWith('/room')) {
      return <Sidebardata />;
    }
    if(!admin){
      return <Sidebaradmin />;
      
    }
    return <Sidebaruser />;
  }
}

export default App