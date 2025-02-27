import React from 'react'
import { useState ,useEffect} from 'react';
import '../styles/Login.css'
import { useNavigate } from "react-router-dom"   
import  Amount  from '../store/Store'; 
export default function Login() {
    const navigate = useNavigate()
    const {user,setUser,admin,setAdmin}=Amount();
    const [username,setUsername ] =useState('');
    const [password,setPassword ] =useState('');
    const [invalid,setinvalid ] =useState('');   
    const [db_user1, setdb_user1] = useState();
    const [db_password1, setdb_password1] = useState();
    const [db_user2, setdb_user2] = useState();
    const [db_password2, setdb_password2] = useState();
    function handlesumbit(event){
        event.preventDefault()
        if(db_user1==username&db_password1==password){
            navigate('/converter_user');
            setinvalid("");
            setUser(true)
            setAdmin(false)
          }
          else if(db_user2==username&db_password2==password){
            console.log("admin")
            navigate('/converter_admin');
            setinvalid("");
            setUser(false)
            setAdmin(true)
    }
        else{
            setinvalid("Invalid Credentilas")
        }
        setUsername("")
        setPassword("")
        
    }
    useEffect(()=>fetchDetails,[]);
    const fetchDetails = async () => {
        try {
          const res = await fetch("http://localhost:7000/fetch-details", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          console.log("Fetched Data:", data);
          if (!res.ok) {
            throw new Error("HTTP Error");
          }
          if (Array.isArray(data.usercredentilas)) {
            setdb_user1(data.usercredentilas[0].user_id);
            setdb_password1(data.usercredentilas[0].password);
            setdb_user2(data.usercredentilas[1].user_id);
            setdb_password2(data.usercredentilas[1].password);
          } else {
            console.error("Unexpected data format:", data);
          }
        } catch (error) {
          console.error("Fetch Error:", error);
        }
      };
  return (
    <div>
        <div className="main">
            <div className="logincontent">
                <h1>LOGIN</h1>
                <div className="loginform"></div>
                <form onSubmit={handlesumbit} >
                    <i className="fa-solid fa-user"></i>
                    <input className='username' type="text" placeholder="Username" required value={username} onChange={(e)=>setUsername(e.target.value)} /><br/>
                    <i className="fa-solid fa-lock"></i>
                    <input className='password' type="password" placeholder="Password" required  value={password} onChange={(e)=>setPassword(e.target.value)}  /><br/>
                    <p className='error'>{invalid}</p>
                    <button className='sumbitbutton' type="submit">Login</button>    
                </form>
            </div>
        </div>
    </div>
  )
}