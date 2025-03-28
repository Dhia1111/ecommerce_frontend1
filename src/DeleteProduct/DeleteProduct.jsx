import { useLoaderData } from "react-router-dom"
import { DeleteProduct as DeleteProductApi } from "../APIs/Products"
import Styles from "./DeleteProduct.module.css"

export default function DeleteProduct(){
   
    const DataLoader=useLoaderData();
   
    if(DataLoader) return (<h2 className={Styles.h2}>Product Deleted Secsessfuly</h2>)
        else return (<h2 className={Styles.h2}>Product Deleting failed</h2>)
        }


export async function Loader({request}) {

    const url = new URL(request.url);
    const ProductID = url.searchParams.get('ProductID');  
     if(!ProductID) return null
     console.log("ProductID from the Delete Product JSX " +ProductID)
   return await DeleteProductApi(Number(ProductID))
    
}