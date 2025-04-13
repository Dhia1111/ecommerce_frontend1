

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
    console.log("process.env.REACT_APP_URL_LogOut :"+process.env.REACT_APP_URL_LogOut);
    try{

        await fetch(process.env.REACT_APP_URL_LogOut,{
            method:"POST",
            credentials:"include",
            headers: { "Content-Type": "application/json" },         
        })
       return true

   }
   catch{
    console.log("Catch the request to log out")

       return false;
   }
    
}