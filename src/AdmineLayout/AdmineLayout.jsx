
import Styles from "./AdmineLayout.module.css"
import { Outlet } from "react-router-dom"
import NavBar from "../AdmineNavBar/NavBar.jsx"

export default function AdmineLayOut(){


  return(  <div className={Styles.Container}>
  <NavBar Color="black" Postion="relative" />

    

        <Outlet />
      
    
   
        </div>)
        }


