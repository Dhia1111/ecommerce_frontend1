

export async function GetPersonInf() {
    try{

         const Responce=await fetch(process.env.REACT_APP_URL_GetCustomerInf,{
            method:"GET",
            credentials:"include",
            headers: { "Content-Type": "application/json" }            
        })
        if(Responce.ok){
            return await Responce.json();
        }
        else{
            return null;
        }

   }
   catch{
       return null;
   }
    
}

export async function LogOutAPI() {

  

    //Update the cart inf 
     try{

       const Response= await fetch(process.env.REACT_APP_URL_LogOut,{
            method:"POST",
            credentials:"include",
            headers: { "Content-Type": "application/json" },         
        })
if(Response.ok){
    return true

}
return false;
   }
   catch{
 
       return false;
   }
    
}

export async function IsLogedIn() {


   try{

    const response =await fetch(process.env.REACT_APP_URL_ISLOGEDIN,{

        method:"GET",
        credentials:"include",
        headers: { "Content-Type": "application/json" } 
     
    })
       console.log("CheckLogIn from api")
    if(response.ok){
        return await response.json();
    }
    else{
        return false
    }

    }

   
   catch{

    return false
   }
  
}