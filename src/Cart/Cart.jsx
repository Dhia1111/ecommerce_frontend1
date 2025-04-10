import Styles from "./Cart.module.css"
import { Link } from "react-router-dom";
import  CartItem from "../Cart_Item/Cart_Item.jsx"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {SetTofalse} from "../State/Cart/CartState.ts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket as arrowFrombracket} from "@fortawesome/free-solid-svg-icons"
import { faAnglesRight  as NextIcone} from "@fortawesome/free-solid-svg-icons"


export default function Cart(){
   const DispatchApp=useDispatch();

   const ShowCart=useSelector((state)=>state.ShowCart.value);
   const CartItmes=useSelector((state)=>state.CartItems.value);
   
 

  var Translate=(ShowCart)? "translate(-100%)":"translate(0%)";

return (<>
  <div className={Styles.Container} style={{transform:Translate}} >

         <div className={Styles.SubContainer}> 
            <h3 className={Styles.h3}>Cart</h3> 
            <Link to="/Cart" onClick={()=>{DispatchApp(SetTofalse())}}><FontAwesomeIcon icon={NextIcone}/>Buy</Link>
            <FontAwesomeIcon icon={arrowFrombracket} className={Styles.btn} onClick={()=>{DispatchApp(SetTofalse())}}/>

         </div>
         
      

      {CartItmes&&CartItmes.map((item) => (

               <CartItem key={item.ProductID} ID={item.ProductID} Name={item.Name} price={item.Price} NumberOfProduct={item.NumberOfItems} image={item.Image} />


))}
  
 </div>
    </>)
}


export function Loader(){
   //get the first 5 element in the baseket 
}
