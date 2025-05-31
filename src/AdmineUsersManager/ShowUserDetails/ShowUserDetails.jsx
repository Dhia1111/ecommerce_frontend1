
import Styles from "./ShowUserDetails.module.css"
import { useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";

import {GetUserAthorization} from '../../APIs/Users.js'

 


export default function ShowTrasactionDetails(){
const LoacationData=useLocation();
const AllAthorization=useLoaderData();
const [UserAuthorizations,setUserAuthorizations]=useState([]);
const [User,setUser]=useState(null);

    useEffect(()=>{


        if(LoacationData.state!=null&&AllAthorization?.length>0){

          if(LoacationData.state.userRole!=="Admine"){
              const FilterAthorizationForUser=AllAthorization.filter(e=>(Number(e.key)&Number(LoacationData.state.userAtherization))===Number(e.key)).map(item=>item.value);
            setUserAuthorizations(FilterAthorizationForUser);
          }
          else{
            setUserAuthorizations(AllAthorization.map(e=>e.value));
          }
            setUser(LoacationData.state);
        }
        else{
            return;
        }



    },[LoacationData,AllAthorization])


    if(User!=null&&AllAthorization?.length>0){

   return (
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
          {UserAuthorizations.map((auth, index) => (
            <div key={index} className={Styles.AthorizedItem}>
            
              {auth}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
    }
    else{

        return <h2>thier is not user to display</h2>
    }
  
}


export async function Loader(){

    const response= await GetUserAthorization()
    if(response.state===1){
return response.Data;
    }
    else{
        return []
    }
}