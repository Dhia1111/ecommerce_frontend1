

export async function GetAllUsers() {
    
    console.log("process.env.REACT_APP_URL_GETALL_TRANSACTIONS "+process.env.REACT_APP_URL_GETALL_USERS)
    try{
        
        const respose=await fetch(process.env.REACT_APP_URL_GETALL_USERS,{

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


export async function DeleteUser(UserID){

    try{

        const respose=await fetch(process.env.REACT_APP_URL_DELETE_USER+UserID,{

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
            return {state:1,message:"Failed"}

    }
}


export async function UpdateUser(User){

    try{

        const respose=await fetch(process.env.REACT_APP_URL_UPDATE_USER,{

            method:"POST",
            credentials:"include",
            headers: { "Content-Type": "application/json" }, 
            body:JSON.stringify(User)
     })

        const Data=await respose.json();

        if(respose.ok){

            return {state:1,message:Data?.message||"Secsseded"}
        }
        else{
            return {state:0,message:Data?.message||"Failed"}

        }


    }catch{
            return {state:1,message:"Failed"}

    }
}


export async function GetUserAthorization(){

    try{

        const respose=await fetch(process.env.REACT_APP_URL_GET_USER_ATHORIZATIONS,{

            method:"GET",
            credentials:"include",
            headers: { "Content-Type": "application/json" } 



        })

        const Data=await respose.json();

        if(respose.ok){

            return {state:1,message:"Secsseded",Data:Data}
        }
        else{
            return {state:0,message:Data?.message||"Failed"}

        }


    }catch{
            return {state:1,message:"Failed"}

    }
}


export async function GetUserRoles(){

    try{

        const respose=await fetch(process.env.REACT_APP_URL_GET_USER_ROLES,{

            method:"GET",
            credentials:"include",
            headers: { "Content-Type": "application/json" } 



        })

        const Data=await respose.json();

        if(respose.ok){

            return {state:1,message:"Secsseded",Data:Data}
        }
        else{
            return {state:0,message:Data?.message||"Failed"}

        }


    }catch{
            return {state:1,message:"Failed"}

    }
}
