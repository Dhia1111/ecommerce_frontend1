
import { Link } from "react-router-dom"
import Styles from "./ProductsList.module.css"
import { useLoaderData } from "react-router-dom"
import {ShowProductList} from "../APIs/Products.js"

export default function ProductsList(){

const LoaderData=useLoaderData();

 if(LoaderData) {
             const List= LoaderData.map((product)=>{
             return(  <div key={product.id} className={Styles.ListContainer}>
            <img  src={product.imageUrl} alt={product.name}/>
            <p>{product.name}</p>
            <span>{product.price+"$"}</span>
            <Link  to={`/Admine/ProductMangment/UpdateProduct?ProductID=${product.id}`}>Update</Link>
            <Link to={`/Admine/ProductMangment/DeleteProduct?ProductID=${product.id}`}>Delete</Link>
         </div>)

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
                
<div className={Styles.Container}>
    <h3>List</h3>
</div>

    )
}


}


export async function Loader(){

    return await ShowProductList();

}