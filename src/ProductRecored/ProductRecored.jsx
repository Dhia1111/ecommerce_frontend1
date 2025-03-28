

import Styles from "./ProductRecored.module.css"
import { useDispatch } from "react-redux"
import {ReduceCount,DeleteItem,AddItem} from "../State/CartItems/CartItems.ts"

export default function ProductRecored({ ID,image,price,Name,NumberOfProduct}){
const Dispatch=useDispatch();

 return(  
      <div className={Styles.Container}>
         
         <button onClick={()=>{Dispatch(DeleteItem(ID)); }}>x</button>

    <img className={Styles.img} src={image} alt={Name}/>
    <h3 className={Styles.h3}>{Name}</h3>
    <span className={Styles.span}>Price {price}$</span>

    <button onClick={()=>{  Dispatch(AddItem(ID));}}>Delete</button> 

     <button onClick={()=>{Dispatch(ReduceCount(ID)); }}>show detales</button>

     <button onClick={()=>{Dispatch(ReduceCount(ID)); }}>Update </button>


</div>)

}


