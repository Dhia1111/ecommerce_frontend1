

import Styles from "./NavBar.module.css"
import {Link} from "react-router-dom"
import {faUser as UserIcon} from "@fortawesome/free-solid-svg-icons"
import {faBars as Bars} from "@fortawesome/free-solid-svg-icons"
import {faXmark as Xmark} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
 import { memo, useEffect } from "react"

function NavBar({Postion="fixed", Color="white", BackGroundColor="transparent"}){

 
   useEffect((()=>{

    var LinkColection=document.getElementById("LinkColection");
    var Xmark=document.getElementById("NavXmark");
    var Bars=document.getElementById("NavBars");
    
   if(LinkColection&&Xmark&&Bars&&(window.innerWidth<778)){
    LinkColection.style.display="none";
    Xmark.style.display="none";
    Bars.style.display="block";
   }
    else{
      if(LinkColection&&Xmark&&Bars&&(window.innerWidth<778)){
        LinkColection.style.display="none";
        Xmark.style.display="none";
        Bars.style.display="none";
       }
    }

   }),[])
   return( 
   <div id="NavBar" className={Styles.Container} style={{position:Postion, color:Color,  backgroundColor:BackGroundColor}} >
    
     <div className={Styles.SubContainer}>
    <Link to="/" className={Styles.h2}>#DEPhone</Link>
     <div id="LinkColection">

     <Link to ="/Admine/TransactionMangment" >Transaction Manger</Link>
     <Link to ="/Admine/UsersManger" >Users Manger</Link>
     <Link to ="/Admine/UsersManger/AddUser" >Add User</Link>
     <Link to ="/Admine/ProductMangment" >Product Manger</Link>
     <Link to ="/Admine/ProductMangment/AddProduct" >Add Product</Link>
  
    
    </div>
    </div>

  <div  className={Styles.CardAndUser}>
 
   <FontAwesomeIcon id="NavBars" className={Styles.Bars} icon={Bars}   onClick={()=>{

var LinkColection=document.getElementById("LinkColection");
var Bars=document.getElementById("NavBars");
var Xmark=document.getElementById("NavXmark");


LinkColection.style.display="flex";

Bars.style.display="none";
Xmark.style.display="block";

}}/>

   <FontAwesomeIcon id="NavXmark" className={Styles.NavXmark} icon={Xmark}   onClick={()=>{

var LinkColection=document.getElementById("LinkColection");
var Xmark=document.getElementById("NavXmark");
var Bars=document.getElementById("NavBars");

LinkColection.style.display="none";
Xmark.style.display="none";
Bars.style.display="block";


   }} />


 <Link className={Styles.AccountLink} to="/accountant-access">  <FontAwesomeIcon icon={UserIcon}/></Link>

 
  </div>

   </div> 
   )

}

export default memo(NavBar)

window.addEventListener("resize", (event) => {
  if( window.innerWidth<778){
    var LinkColection=document.getElementById("LinkColection");
var Xmark=document.getElementById("NavXmark");
var Bars=document.getElementById("NavBars");

 if(LinkColection) LinkColection.style.display="none";
if(Xmark) Xmark.style.display="none";
if(Bars) Bars.style.display="block";


  }
  else{
     LinkColection=document.getElementById("LinkColection");
     Xmark=document.getElementById("NavXmark");
     Bars=document.getElementById("NavBars");
    
     if(LinkColection) LinkColection.style.display="flex";
    if(Xmark) Xmark.style.display="none";
    if(Bars) Bars.style.display="none";
    
    
  }
  });