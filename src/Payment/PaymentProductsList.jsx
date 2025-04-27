import Styles from "./Payment.module.css"
import { useSelector } from "react-redux";
import CartItem from "../Cart_Item/Cart_Item";
import { memo } from "react";
export default  memo( function PaymentProductsList(){
  console.log("Run Product list")
    const ProductList=useSelector((state)=>state.CartItems.value);

return(   <div className={Styles.List}>
  
    <h3 className={Styles.h3}>List</h3>

    {
      ProductList&& ProductList.map((item) => (
      
    
      <CartItem key={item.ProductID} ID={item.ProductID} Name={item.Name} price={item.Price} NumberOfProduct={item.NumberOfItems} image={item.Image} />
      
       

      ))
    }


    </div>)
})