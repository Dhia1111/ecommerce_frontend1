
import Styles from "./SmallCard.module.css"
import { useDispatch,useSelector } from "react-redux"
 import { AddItem } from "../State/CartItems/CartItems.ts";
 import { useEffect, useState } from "react";


export default function SmallCard({id, image,price,Name}){

const [isProductInCart,setisProductInCart]=useState(false);

    const CartItmes=useSelector((state)=>state.CartItems.value);
   

    const Dispatch=useDispatch();
    

    useEffect(()=>{
        setisProductInCart(false);
        CartItmes.forEach(element => {
            if(element.ID===id){
                setisProductInCart(true);
                return;
            }
        });

    },[CartItmes,id])
 

 return(   <div className={Styles.Container}>
    <img src={image} alt={Name}/>
    <h3 className={Styles.h3}>{Name}</h3>
    <span className={Styles.span}>{price}$</span>
    
    <button disabled={isProductInCart} onClick={()=>{
        //First check if the product does not exsist then add one to the cart items and incresce the Count  
        //if the product added  block the add bottn wth the propre design 
        //you must inclued all cart items in the store
        //Create a function that indecate if the product is included (change the product state)
        // 
        Dispatch(AddItem({ ID: id, Name: Name, Price: price, NumberOfItems: 1, Image:image}));
    }}>+</button>
</div>)

}


