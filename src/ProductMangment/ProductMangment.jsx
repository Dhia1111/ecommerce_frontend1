import { Outlet } from "react-router-dom"
import Styles from "./ProductMangment.module.css"



export default function ProductMangment(){
    return (<>
    
    <h2 className={Styles.h2}>ProductMangment</h2>

     <Outlet/>
    </>)
}