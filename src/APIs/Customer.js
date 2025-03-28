

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

    try{

        const Responce=await fetch(process.env.REACT_APP_URL_LogOut,{
            method:"GET",
            credentials:"include",
            headers: { "Content-Type": "application/json" }            
        })
        if(Responce.ok){

            return true;
   
        }
        else{
            return false;
        }

   }
   catch{
    console.log("Catch the request to log out")

       return false;
   }
    
}