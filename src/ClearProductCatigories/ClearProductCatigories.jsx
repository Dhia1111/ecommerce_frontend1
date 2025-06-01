import { useLoaderData } from "react-router-dom"
import {  DeleteCatigoriesFroProduct, IsAthorized } from "../APIs/Products"
import Styles from "./ClearProductCatiogories.module.css"

export default function ClearCatigoriesForProduct(){
   
    const { ClearProductResult,IsUserAthorized}=useLoaderData();
    console.log("Clear result : "+ ClearProductResult)
   
   if(IsUserAthorized===true){
 
    if(ClearProductResult===true) return (<h2 className={Styles.h2}> Catigories Cleaned secsessfuly </h2>)
        else {

            return (<>
            <h2 className={Styles.h2}>Clearing Catigories failed  {ClearProductResult}</h2>
            </>)
        
        }
        }

        else{
            return(<h2>You are  not Athorized to Delete Page </h2>)
           }
        
        
   }

   
export async function Loader({request}) {

 console.log("CLear Catigories ProductLoader : ");

    const IsUserAthorized=await IsAthorized(512);
    if(IsUserAthorized===false){
        return {IsUserAthorized}
    }
    const url = new URL(request.url);

    const ProductID = url.searchParams.get('ProductID'); 

     if(!ProductID) return {IsUserAthorized}

    const ClearProductResult= await DeleteCatigoriesFroProduct(Number(ProductID))

    return {ClearProductResult:ClearProductResult,IsUserAthorized:IsUserAthorized}

}