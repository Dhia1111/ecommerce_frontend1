
import Styles from "./CartRecored.module.css"


export default function SmallCard({image,price,Name}){

 return(   <div className={Styles.Container}>
    <img src={image} alt={Name}/>
    <h3 className={Styles.h3}>{Name}</h3>
    <span className={Styles.span}>{price}$</span>
</div>)

}


