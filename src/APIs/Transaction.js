


export async function GetAllTransactions() {
    
    try{
        
        const respose=await fetch(process.env.REACT_APP_URL_GETALL_TRANSACTIONS,{

       method:"GET",
        credentials:"include",
        headers: { "Content-Type": "application/json" } 
              

        })

         const Data=await respose.json();
    if(respose.ok){
        
        return      {state:1, Data: Data};

    }  
    else{

        return {state:0, message: Data?.message||"Failed"}
        
    }      
        

    }
    catch{
                return {state:0, message: "Error to fetch data "}

         
    }
}

export async function DeleteTrasnaction(TrasactionID){

    try{

        const respose=await fetch(process.env.REACT_APP_URL_DELETE_TRANSACTION+TrasactionID,{

            method:"DELETE",
            credentials:"include",
            headers: { "Content-Type": "application/json" } 



        })

        const Data=await respose.json();

        if(respose.ok){

            return {state:1,message:Data?.message||"Secsseded"}
        }
        else{
            return {state:0,message:Data?.message||"Failed"}

        }


    }catch{
            return {state:0,message:"Failed"}

    }
}
export async function GetProductsListForTransaction(ResivedID){

    const ID=Number(ResivedID)
    console.log("All product for transaction : "+process.env.REACT_APP_URL_GETALL_TRANSACTION_PRODUCTS+ID)
    try{

        const respose=await fetch(process.env.REACT_APP_URL_GETALL_TRANSACTION_PRODUCTS+ID,{

       method:"GET",
        credentials:"include",
        headers: { "Content-Type": "application/json" } 
        
              
        })
        const Data=await respose.json();

        if(respose.ok){

            return {state:1,message:"secsseded",Data:Data}

        }

        else{
            return {state:0,message:Data?.message||"Failed"}

        }
    }
    catch{

        
        return {state:0,message:"Failed"}


    }

}