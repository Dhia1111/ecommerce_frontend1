import Styles from "./AccountLayOut.module.css"
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
export default function AccountLayOut(){

    return <>  
     
    <div className={Styles.Container}>
    <Outlet/>
     <Link className={Styles.link} to="/Admine/ProductMangment">Product Mangment</Link>

    </div>
    </>
}