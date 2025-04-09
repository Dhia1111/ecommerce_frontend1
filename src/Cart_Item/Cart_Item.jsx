

import Styles from "./CartItem.module.css"
import { useDispatch } from "react-redux"
import {IncriceNumberOfItems,DecrceNumberOfItems,DeleteItem} from "../State/CartItems/CartItems.ts"

export default function CartItem({ ID,image,price,Name,NumberOfProduct}){
 const Dispatch=useDispatch();
 return(  
      <div className={Styles.Container}>
         
         <button onClick={()=>{Dispatch(DeleteItem(ID)); }}>x</button>

    <img className={Styles.img} src={image} alt={Name}/>
    <h3 className={Styles.h3}>{Name}</h3>
    <span className={Styles.span}>Price {price}$</span>
    <span className={Styles.span}>Totole items {NumberOfProduct}</span>

    <span className={Styles.span}>Totole Price {parseInt(NumberOfProduct, 10)*parseInt(price, 10)}$</span>

 
    
    <button onClick={()=>{  Dispatch(IncriceNumberOfItems(ID));}}>+</button> 

     <button onClick={()=>{Dispatch(DecrceNumberOfItems(ID)); }}>-</button>

</div>)

}


