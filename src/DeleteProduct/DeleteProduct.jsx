import { useLoaderData } from "react-router-dom"
import { DeleteProduct as DeleteProductApi, IsAthorized } from "../APIs/Products"
import Styles from "./DeleteProduct.module.css"

export default function DeleteProduct(){
   
    const {DataLoader,IsUserAthorized}=useLoaderData();
   
   if(IsUserAthorized===true){
 
    if(DataLoader) return (<h2 className={Styles.h2}>Product deleted secsessfuly </h2>)
        else {

            return (<>
            <h2>{DataLoader}</h2>
            <h2 className={Styles.h2}>Product Deleting failed {DataLoader}</h2>
            </>)
        
        }
        }

        else{
            return(<h2>You are  not Athorized to Delete Page </h2>)
           }
        
        
   }

   
export async function Loader({request}) {

 console.log("Delete ProductLoader : ");

    const IsUserAthorized=await IsAthorized();
    if(IsUserAthorized===false){
        return {IsUserAthorized}
    }
    const url = new URL(request.url);
    const ProductID = url.searchParams.get('ProductID');  
     if(!ProductID) return {IsUserAthorized}
    const DataLoader= await DeleteProductApi(Number(ProductID))
    return{DataLoader,IsUserAthorized}
    
}