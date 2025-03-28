
import Styles from "./AdmineLayout.module.css"
import { Outlet } from "react-router-dom"


export default function AdmineLayOut(){

    return(<>
    <h2 className={Styles.h2}>Admine</h2>
    <Outlet/>
    </>)    

    
}