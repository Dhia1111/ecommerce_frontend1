import Styles from "./Cart.module.css"
import{useSelector} from 'react-redux'

export default function Cart(){

 const CartItems=useSelector((state)=>state.CartItems.value)

 //mapping the product based on the element

 

    return (<>
  <div className={Styles.Container}>

  <h3>Cart</h3>

 </div>
    </>)
}


