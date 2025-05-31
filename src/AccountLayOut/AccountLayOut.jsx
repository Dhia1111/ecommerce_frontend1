import Styles from "./AccountLayOut.module.css"
import { Outlet } from "react-router-dom"
 export default function AccountLayOut(){

    return <>  
     
    <div className={Styles.Container}>
    <Outlet/>

    </div>
    </>
}