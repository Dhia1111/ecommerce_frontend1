import { useState } from "react";
import Styles from "./LogInAmdSignUp.module.css"
import { Form,Navigate,useLoaderData } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useRef } from "react";
import { IsLogedIn } from "../APIs/Customer";
import { useNavigate } from "react-router-dom";


function LogInAmdSignUp(){


   const [LogInMessage,setLogInMessage]=useState("");
    const [SignUpMessage,setSignUpMessage]=useState("");
    const [LogInError,setLogInError]=useState("");
    const [SignUpError,setSignUpError]=useState("");
    const [signingUp,setSigningUp]=useState(false);
    const [LoggingIn,setLoggIng]=useState(false);
     const ContainerRef=useRef(null);
     const LoaderData=useLoaderData();
     const Navigatefn=useNavigate();
    

     if(LoaderData===true)
        {
            return <Navigate to="/accountant-access/logout" replace />;
        }
  


   async function LogIn(e){

        e.preventDefault();
        if(ContainerRef.current){

            setLoggIng(true);
            setLogInMessage("Fteching.... ");
            setLogInError("");
            const formData = new FormData(e.target); // Get form data
            const data = Object.fromEntries(formData.entries()); // Convert to an object
      
            try{

                
               const responce= await fetch(process.env.REACT_APP_URL_LOGIN,{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                credentials:"include",
                body:JSON.stringify(
                    {    
                        "userID": 0,
                        "personID": 0,
                        "userRole": 1,
                        "userAtherization": 0,
                        "userName": data.UserName,
                        "userPassword": data.PassWord,
                        "createdAt": "",
                        "person": {
                          "personID": 0,
                          "firstName": "",
                          "lastName": "",
                          "email": "user@example.com",
                          "phone": "",
                          "country": "",
                          "postCodeAndLocation": "",
                          "city": ""
                        }
                      
                          }
                    
                ),
             
            })

            setLoggIng(false);

           const Data=await responce.json();
            if(responce.ok){
              setLogInMessage(Data?.message);
                setLogInError("");

                Navigatefn("logout",{replace:true})
               
            }
            else{
                  setLogInError(Data?.errorType);
                setLogInMessage(Data?.message);
            }
            }

            catch{
                setLogInMessage("failed to log in please check the UserName and the  PassWord ");
            setLoggIng(false);

            }

             
    }

   }

   
    const LogInContent=(

        <div className={Styles.LogInContainer}>
            {LogInMessage&&<p>{LogInMessage}</p>}
            {LogInError&&<p>{"Error : "+LogInError}</p>}
            <h2>Log In</h2>
            <Form onSubmit={LogIn} method="POST"> 
             <input type="text" placeholder="Name" name="UserName" />
            <input type="passWord" placeholder="Pass Word" name="PassWord" security="*"/>
            <input  type="submit" disabled={LoggingIn||signingUp} value="Log In"/>
         
    
    
            </Form>
        </div>
    
     ) 


async  function  SignUp(e){

        e.preventDefault();
        if(ContainerRef.current){

         try{

            setSigningUp(true);
            setSignUpMessage("Fteching.... ");
            setSignUpError("");

            const formData = new FormData(e.target); // Get form data
            const data = Object.fromEntries(formData.entries()); // Convert to an object
            const response= await fetch(process.env.REACT_APP_URL_SIGNUP,{
                method:"Post",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(
                    {
                        
                            "userID": -1,
                            "personID": -1,
                            "userRole": 1,
                            "userAtherization": 0,
                            "userName":  data.UserName,
                            "userPassword": data.PassWord,
                            "createdAt": "string",
                            "person": {
                              "personID": -1,
                              "firstName":"",
                              "lastName": "",
                              "email": data.Email,
                              "phone":"",
                              "country": "",
                              "postCodeAndLocation": "",
                              "city": ""
                            }
                          }
                    
                ),
             
            })
 
            setSigningUp(false);
            const Data=await response.json();
            if(response.ok){

               
                setSignUpMessage(Data?.message);
                setSignUpError();
                // Navigate to the log Out Page

            }
            else{

                setSignUpMessage(Data?.message);
                setSignUpError(Data?.errorType);
            }

             
          
         }catch{

            setSignUpError("Error : failed to fetch !!!");
            setSigningUp(false);

         }
        }
        
          


     }


async function ValidateUserName(e){
  try{

    const UserName = e.target.value; 
    console.log("Name is  "+UserName)
    if(UserName.length<4){

        setSignUpMessage("Make sure to set the UserName obve 3 letters")

        return;
    }
    setSignUpMessage("")

   const responce= await fetch(process.env.REACT_APP_URL_IsUserNameFreeToUser,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(UserName),
          
    })
var result=false;
   if(responce.ok) {
    result= await responce.json(); 
    
    if(result) {

        setSignUpMessage("User Name is free to use  ")
     setSignUpError("");

    }

    else{
        setSignUpMessage("this user name is used by onother person")
        setLogInError("");

    }
   
        
}
   else{
    setSignUpError("unvaliad data");

   }

  }catch{

  }

    
}


     const SignUpContent=(

        <div className={Styles.SignUpContainer}>
            {SignUpMessage&&<p>{SignUpMessage}</p>}
            {SignUpError&&<p>{"error : "+ SignUpError}</p>}
            <h2>Sign Up</h2>
            <Form onSubmit={SignUp} method="POST"> 
            <input type="email" name="Email" placeholder="Email" required />
            <input type="text" name="UserName" placeholder="User Name"  onChange={ValidateUserName}/>
            <input type="passWord" name="PassWord" placeholder="PassWord" />
            
            <p>A link to set a new password will be sent to your email address.</p>
            
             <p>
                Your personal data will be used to support your experience throughout this website,
              to manage access to your account, and for other purposes described in our privacy policy
              .</p>
            
            <input  type="submit" disabled={signingUp||LoggingIn} value="Sign Up"/>

    
            </Form>
        </div>
    
     )




  const Container=(<div ref={ContainerRef}  className={Styles.Container}>
      <NavBar Postion="relative" Color="black" BackGroundColor="white"/>
    {LogInContent}
    {SignUpContent} 
   
    </div>
    )


 return Container ;



}

export default LogInAmdSignUp;


 
export async  function Loader(){



return await IsLogedIn()    

}