import { useEffect, useState } from "react";
import Styles from "./LogOut.module.css"
import {IsLogedIn, LogOutAPI} from"../APIs/Customer.js"
import { useLoaderData, useNavigate } from "react-router-dom";
import {}from "../APIs/Customer.js"
 import NavBar from "../NavBar/NavBar.jsx";
export default function LogOut(){

    
    const Navigate=useNavigate();
    const Loader=useLoaderData(0)
    const [isLogingIn,setLogInOut]=useState(false);

    useEffect(()=>{
 
if(!Loader){

      Navigate("/", { replace: true });

}},[Navigate,Loader])

    return <div className={Styles.Container}>
      <NavBar  BackGroundColor="white" Postion="relative" Color="black"/>
 
    <button disabled={isLogingIn} onClick={ async()=>{
          setLogInOut(true);
           
    const result= await LogOutAPI();
              if(result){
                  
              setLogInOut(false);

              Navigate("/", { replace: true });
                
        }
  
              



        }} >{isLogingIn?"Loging out...":"LogOut"}</button>
        
        </div>
}


export async function Loader()
      
 {

      return await IsLogedIn()
}