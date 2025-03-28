import Styles from "./LayOut.module.css"
import { Outlet } from "react-router-dom"
export default function LayOut(){

    
    return (
        <div className={Styles.Container}>
        <Outlet/>
        </div>
    )
}