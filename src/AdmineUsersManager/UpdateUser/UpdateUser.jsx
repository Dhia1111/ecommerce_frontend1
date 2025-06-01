

import Styles from "./UpdateUser.module.css"

import { useEffect, useRef, useState } from "react";

import { useLoaderData, useLocation } from "react-router-dom";

import {GetUserAthorization,GetUserRoles,UpdateUser as UpdateUserAPI} from '../../APIs/Users.js'
import {IsAthorized} from "../../APIs/Products.js"

export default function UpdateUser(){


   

  const LoacationData=useLocation();
const {AllAthorization,AllRoles,isAthorizedResponse}=useLoaderData();
const urlAdmineBT=useRef(null)
const urlCustomerBT=useRef(null)
const urlAthorizedUserBT=useRef(null)
const [User,setUser]=useState(null);
const[NewRole,setNewRole]=useState();
const [NewAthorizations,setNewAthorizations]=useState([])
const [IsUpdating,setIsUpdating]=useState(false)
const [Message,setMessage]=useState("")


   
    useEffect(()=>{


        if(LoacationData.state!=null){

     setNewRole(LoacationData.state.userRole);
            setUser(LoacationData.state);
        }
    
setNewAthorizations(AllAthorization.filter((auth)=>(Number(auth.key)&Number(LoacationData.state.userAtherization))===Number(auth.key)))       

    },[LoacationData,AllAthorization])



    async function handleUpdate()
     {

      setMessage("")
      setIsUpdating(true)
      var AthorizationsNumber=0;
      NewAthorizations.forEach(e=>{AthorizationsNumber+=Number(e.key)})
      const Role=NewRole==="Admine"?1:NewRole==="Customer"?2:3;
      //Build the Athorizations 
      // and set up the role 

    


      const objUser={
    "userID":User.userID,
    "personID": User.personID,
    "userRole": Role,
    "userAtherization":AthorizationsNumber,
    "userName":"",
    "userPassword":"",
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

      const response=await UpdateUserAPI(objUser);
        

        setMessage(response.message)

        setIsUpdating(false);

       

    }
    
      function handleCheckAthorization(event) {
   
      const target=event.target;
      const key=Number(target.id);

       
      if(target.checked){

       if(!NewAthorizations.some(e=>Number(e.key)===key)){


        setNewAthorizations(Athorizations=>[...Athorizations,{key:key,value:target.value}])

        }
      }
      else{
               
      if(NewAthorizations.some(e=>Number(e.key)===Number(key))){

      setNewAthorizations(NewAthorizations.filter(e=>Number(e.key)!==Number(key)).map(element=>element))

      }

    }
 
  }
  function handleRoles(event) {

  const CurentTarget=event.target;
  const AdmineTarget=urlAdmineBT?.current;
  const CustomerTarget=urlCustomerBT?.current;
  const AthorizedUserTarget=urlAthorizedUserBT?.current;
 
  if(CurentTarget.checked){

     setNewRole(event.target.value)
     console.log("New Role : "+event.target.value)

       if(CurentTarget.value===AdmineTarget.value){

       AthorizedUserTarget.checked=false;
       CustomerTarget.checked=false;
       AdmineTarget.checked=true;

       }
       else if(CurentTarget.value===AthorizedUserTarget.value){
          AdmineTarget.checked=false;
          CustomerTarget.checked=false;
          AthorizedUserTarget.checked=true;
 
       }
       else{
AthorizedUserTarget.checked=false;
AdmineTarget.checked=false;
CustomerTarget.checked=true;
setNewAthorizations([])
setUser(prev=>({
  ...prev,
 userAtherization:0,


}))


       }
  
    }
 
  
}

if(isAthorizedResponse===true){
  if(User!=null&&AllAthorization?.length>0&&AllRoles?.length>0){

   return (

<>              {Message&&<p className={Styles.p}>{Message} </p>}

    <div className={Styles.Container}>
      <div className={Styles.UserInfSection}>
        <h2>User Profile</h2>
        <div className={Styles.UserInfGrid}>
          <div className={Styles.PersonInf}>
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {User.firstName} {User.lastName}</p>
            <p><strong>Email:</strong> {User.email}</p>
            <p><strong>Phone:</strong> {User.phone}</p>
            <p><strong>Location:</strong> {User.city}, {User.country}</p>
            <p><strong>Post Code:</strong> {User.postCodeAndLocation}</p>
          </div>

          <div className={Styles.AccountInf}>
            <h3>Account Details</h3>
            <p><strong>User ID:</strong> {User.userID}</p>
            <p><strong>Person ID:</strong> {User.personID}</p>
            <p><strong>Role:</strong> {User.userRole}</p>
            <p><strong>Username:</strong> {User.userName}</p>
            <p><strong>Created At:</strong> {User.createdAt}</p>
          </div>
        </div>
      </div>

      <div className={Styles.AuthorizationSection}>
        <h3>User Authorizations</h3>
        <div className={Styles.AthorizedGrid}>
          {(AllAthorization?.length>0&&NewRole!=="Customer"&&NewRole!=="Admine")&&AllAthorization.map((auth) => (
            <div key={auth.key} className={Styles.AthorizedItem}>
            
              {auth.value} 
              <input id={auth.key} value={auth.value} defaultChecked={(Number(auth.key)&Number(User.userAtherization))===Number(auth.key)} type="checkbox" onClick={(e)=>handleCheckAthorization(e)}/>
            </div>
          ))}

         
        </div>
        <div className={Styles.AuthorizationSection}>


                       <h3>User Roles</h3>
                        

        <div className={Styles.AthorizedGrid}>
                 {AllRoles?.length>0&&AllRoles.map((auth) => (
            <div  key={auth.key} className={Styles.AthorizedItem}>
            
              {auth.value} 
              <input key={auth.key}ref={(Number(auth.key)===1)?urlAdmineBT:(Number(auth.key)===2)?urlCustomerBT:urlAthorizedUserBT} value={auth.value} defaultChecked={NewRole===auth.value} type="radio" onClick={(e)=>{handleRoles(e)}}/>
             </div>
          ))}
        </div>

        </div>
      </div>
      <button className={Styles.btn} disabled={IsUpdating} onClick={handleUpdate}>{IsUpdating?"Updating...":"Update"}</button>

    </div></>
  );
}
    else{

        return <h2>thier is not user to display</h2>
    }
}

else{
  return <h2>Not Athorized</h2>
}
    
  
}


export async function Loader(){
 const [authResponse, rolesResponse,IsAthorizedResponse] = await Promise.all([
      GetUserAthorization(),
      GetUserRoles(),
      IsAthorized(1)
    ]);


    if(authResponse.state===1&&rolesResponse.state===1){
return {AllAthorization:authResponse.Data,AllRoles:rolesResponse.Data,isAthorizedResponse:IsAthorizedResponse};
    }
    else{
        return {}
    }
}