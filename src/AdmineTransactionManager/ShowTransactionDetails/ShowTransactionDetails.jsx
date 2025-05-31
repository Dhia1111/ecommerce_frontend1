
import { useLoaderData, useLocation } from "react-router-dom";
import { GetProductsListForTransaction } from "../../APIs/Transaction"
import Styles from "./ShowTransactionDetails.module.css"
import { useEffect, useState } from "react";


export default function ShowTrasactionDetails(){

    const LoaderData=useLoaderData();
    const LocationData=useLocation()

    const [IncludedProducts,setIncludedProducts]=useState([])

    const [TransactionInfo, setTransactionInf]=useState(null)


    useEffect(()=>{
        console.log(" LocationData?.state : "+JSON.stringify(LocationData?.state))
        console.log("LoaderData : "+JSON.stringify(LoaderData))

     if(LocationData?.state!=null&&LoaderData?.state===1){

        setIncludedProducts(LoaderData?.Data||[])
        setTransactionInf(LocationData.state)
     }


    },[LoaderData,LocationData])


if(IncludedProducts?.length>0&&TransactionInfo!=null){
    
    return <div className={Styles.Main}>

   <h2 className={Styles.h2}>Product Details</h2>
  <div className={Styles.Container}>
        <div className={Styles.subContainer}>

<h3 className={Styles.h3}>Transaction Informations</h3>

        <div className={Styles.TransactionInf}>


        <p className={Styles.p}><strong>Transaction ID : </strong>{TransactionInfo.Id}</p>
        <p className={Styles.p}><strong>Totole Price : </strong>{TransactionInfo.TotolePrice} $</p>
        <p className={Styles.p}><strong>Transaction GUID : </strong>{TransactionInfo.TransactionGUID}</p>
        <p className={Styles.p}><strong>Payment Method ID : </strong>{TransactionInfo.PaymentMethodID}</p>
        <p className={Styles.p}><strong>Customer ID : </strong>  {TransactionInfo.CustomerID}</p>
        <p className={Styles.p}><strong> Created at : </strong>{TransactionInfo.TransactionDate}</p>


      </div>

      </div>

    <div className={Styles.subContainer}>
 
        <h3 className={Styles.h3}>Included Products</h3>


          <div className={Styles.IncludedProducts}>

       {IncludedProducts?.length>0&&IncludedProducts.map(e=>
       

         (
         
         <div key={e.id} className={Styles.Product}> 



            <img  src={e.imageUrl} alt={e.name} className={Styles.img}/>
            <p><strong>Product Name : </strong>{e.name} </p>
            <p><strong>Product Price : </strong>{e.price} $</p>
            <p><strong>Number of Products : </strong>{e.numberOfProduct}</p>


         </div>
         
        )

    )}

      </div>
      
    </div>

  </div>

    </div>
}
    else{
        return <>thier is no transaction data loaded </>
}
}



export async function Loader({request}) {

      const url = new URL(request.url);
  
  // Get the "ID" query parameter
  const transactionId = url.searchParams.get("ID");
  
  console.log("Transaction ID : "+ transactionId)
  // Validate the ID exists
  if (!transactionId) {
    throw new Error("ID is missing!");
  }

    const Products=  await GetProductsListForTransaction(transactionId);
     console.log("Products : "+JSON.stringify(Products))
    return Products;

}