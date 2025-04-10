
import { Link } from "react-router-dom"
import Styles from "./ProductsList.module.css"
import { useLoaderData } from "react-router-dom"
import {IsAthorized, ShowProductList as ShowProductListAPI} from "../APIs/Products.js"

export default function ProductsList(){

const {ShowProductList,IsUserAthorized}=useLoaderData();

if(IsUserAthorized){
 if(ShowProductList) {
             const List= ShowProductList.map((product)=>{
             return(
            <div key={product.id} className={Styles.ListContainer}>
            <img  src={product.imageUrl} alt={product.name}/>
            <p>{product.name}</p>
            <span>{product.price+"$"}</span>
            <Link  to={`/Admine/ProductMangment/UpdateProduct?ProductID=${product.id}`}>Update</Link>
            <Link to={`/Admine/ProductMangment/DeleteProduct?ProductID=${product.id}`}>Delete</Link>
         </div>
         )

    })
    
    return( 

    <div className={Styles.MainContainer}>
    <Link to={`/Admine/ProductMangment/AddProduct`}>Add Product</Link>
    <h3>List</h3>
<div className={Styles.Container}>

    {List}
</div>
</div>
    )
}
else{
    return(
                
<div className={Styles.MainContainer}>
<Link to={`/Admine/ProductMangment/AddProduct`}>Add Product</Link>
    <h3>List</h3>
</div>

    )
}
}
else{
    return (<h2>Your Not Athorized to the ProductList Page </h2>)
}

}


export async function Loader(){

     const[ShowProductList,IsUserAthorized]=  await Promise.all([ShowProductListAPI(), IsAthorized()]);
       return  { ShowProductList, IsUserAthorized };
        
   

}