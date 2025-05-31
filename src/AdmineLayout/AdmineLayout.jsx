
import Styles from "./AdmineLayout.module.css"
import { Outlet, useLoaderData } from "react-router-dom"
import { IsAthorized } from "../APIs/Products"
import NavBar from "../AdmineNavBar/NavBar.jsx"

export default function AdmineLayOut(){

    const LoaderData=useLoaderData();

  return(  <div className={Styles.Container}>
  <NavBar Color="black" Postion="relative" />

    {LoaderData&& 
    

        <Outlet />
      
     }
    
          {!LoaderData&&
    
            <>
                <h2 className={Styles.h2}>Your Not Atherized  pleas go back to the main Page</h2>
              
              
             </>   
                
            }
        
        </div>)
        }


export async function Loader(){


 return await IsAthorized();

    
}