
import Styles from "./AdmineLayout.module.css"
import { Outlet, useLoaderData } from "react-router-dom"
import { IsAthorized } from "../APIs/Products"


export default function AdmineLayOut(){

    const LoaderData=useLoaderData();

  return(  <>
  
    {LoaderData&& 
    <>
        <h2 className={Styles.h2}>Admine</h2>
        <Outlet/>
     </>   
     }
    
          {!LoaderData&&
    
            <>
                <h2 className={Styles.h2}>Your Not Atherized  pleas go back to the main Page</h2>
              
              
             </>   
                
            }
        
        </>)
        }


export async function Loader(){


 return await IsAthorized();

    
}