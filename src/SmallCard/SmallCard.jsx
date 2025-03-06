
import Styles from "./SmallCard.module.css"
import { useDispatch } from "react-redux"
import {Increment} from "../State/NumberOfElements/NumberOfElements.ts"

export default function SmallCard({image,price,Name}){
const Dispatch=useDispatch();

 return(   <div className={Styles.Container}>
    <img src={image} alt={Name}/>
    <h3 className={Styles.h3}>{Name}</h3>
    <span className={Styles.span}>{price}$</span>
    
    <button onClick={()=>{
        //First check if the product does not exsist then add one to the cart items and incresce the Count  
        //if the product added  block the add bottn wth the propre design 
        //you must inclued all cart items in the store
        //Create a function that indecate if the product is included (change the product state)
        // 
        Dispatch(Increment());
    }}>+</button>
</div>)

}


