import React, { useEffect } from 'react'
import { useState } from "react";


const User = (props) => {
    const [user,setUser]=useState({name:"Rohit Maurya",location:"Delhi"})
    useEffect(() => {
        getUserData();
    }, [])
    
    async function getUserData() {
        const data = await fetch("https://api.github.com/users/RohitMaurya139");
        const json = await data.json();
        setUser(json);
        // console.log(json)

    }

     if (!user) {
       return <div>Loading...</div>; // Show loading while waiting for data
     }
    return (
      <div className="user-card">
        <img src={user.avatar_url} alt="" style={{ width: 80 }} />
        <h2>Name : {user.name}</h2>
        <h3>Location: {user.location}</h3>
        <h3>
          Github:
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            RohitMaurya139
          </a>
        </h3>
      </div>
    );
}


export default User;
 