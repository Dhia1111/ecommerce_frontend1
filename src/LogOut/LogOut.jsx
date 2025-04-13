import { useState } from "react";
import Styles from "./LogOut.module.css"
import {LogOutAPI} from"../APIs/Customer.js"
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
export default function LogOut(){
    const Navigate=useNavigate();
    const [isLogingOut,setLogInOut]=useState(false);
    return <div className={Styles.Container}>
      <NavBar  BackGroundColor="white" Postion="relative" Color="black"/>
    <button disabled={isLogingOut} onClick={ async()=>{
          setLogInOut(true);
           
    const result= await LogOutAPI();
              if(result){
                  
              setLogInOut(false);

              Navigate("/", { replace: true });
                
        }
  
              



        }} >{isLogingOut?"Loging out...":"LogOut"}</button>
        
        </div>
}


