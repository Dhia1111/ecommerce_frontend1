import Styles from "./LayOut.module.css"
import { Outlet,useNavigation } from "react-router-dom"
import Cart from "../Cart/Cart.jsx"

export default function LayOut(){

  const navigation=useNavigation();
 
    return (
        <div className={Styles.Container}>
           {navigation.state === "loading" || navigation.state === "submitting" ? (
    <div style={{ padding: "1rem", background: "white", textAlign: "center" }}>
       🔄Page is loading, please wait…
    </div>
  ) : null}

            <Cart/>
        <Outlet/>
        </div>
    )
}

