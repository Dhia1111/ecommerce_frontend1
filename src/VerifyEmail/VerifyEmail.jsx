
import Styles from "./VerifyEmail.module.css"
import NavBar from "../NavBar/NavBar"
import { useLoaderData } from "react-router-dom"
export default function VerifyEmail(){

    const  Message=useLoaderData();

    return (
    <div className={Styles.Container}>
    <NavBar Color="black" BackGroundColor="white"/>
    <h2 className={Styles.h2}>Verify email</h2>
    <p className={Styles.Message}>

 {"Message : "+Message}

    </p>

    </div>)
     
}


export async  function Loader({request}){

    const url = new URL(request.url); 
    const GUID_ID = url.searchParams.get("token"); // Extract "token" query param

   try{
    
   const Response=await    fetch(process.env.REACT_APP_URL_VerifyEmail,{
  method:"Post",
  credentials:"include",
   headers: { "Content-Type": "application/json" }
,body:JSON.stringify(
 GUID_ID
)
})



   return await Response.text();



}

catch(e){

   return "error"
}


}