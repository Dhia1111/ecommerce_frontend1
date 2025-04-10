import Styles from "./LayOut.module.css"
import { Outlet } from "react-router-dom"
import Cart from "../Cart/Cart.jsx"
export default function LayOut(){

    
    return (
        <div className={Styles.Container}>
            <Cart/>
        <Outlet/>
        </div>
    )
}