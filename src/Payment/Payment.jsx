import Styles from "./Payment.module.css"
import { useLoaderData } from "react-router-dom"

export default function Payment(){

    const PersonInf=useLoaderData();
    return <>
 
 {PersonInf&&    
    <div className={Styles.Container}>
        <div className={Styles.subContainer}>

        <div className={Styles.PersonInf}>

        <input type="text" value={ PersonInf.firstName} placeholder="First Name"/>
        <input type="text" value={PersonInf.lastName} placeholder="Last Name"/>
        <input type="email" value={PersonInf.email} placeholder="Email"/>
        <input type="text" value={PersonInf.phone} placeholder="Phone"/>
        <input type="text" value={PersonInf.country} placeholder="Country"/>
        <input type="text" value={PersonInf.postCode} placeholder="Post Code"/>


        </div>

        <div className={Styles.CartInf}>

        </div>

        </div>  
         
         
        
    </div>
         
     }
     {(!PersonInf)&&<h2>thier is no user Inf Loaded ,you may need to log in again</h2>}


    </>

}

export async function Loader(){


   
}