

import Styles from "./NavBar.module.css"
import {Link} from "react-router-dom"
import {faUser as UserIcon} from "@fortawesome/free-solid-svg-icons"
import {faBasketShopping as Basket} from "@fortawesome/free-solid-svg-icons"
import {faBars as Bars} from "@fortawesome/free-solid-svg-icons"
import {faXmark as Xmark} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"

function NavBar({Postion="fixed", Color="white", BackGroundColor="transparent"}){
  
   const NumberOfItems=useSelector((state)=>state.Counter.value);
   return( 
   <div id="NavBar" className={Styles.Container} style={{position:Postion, color:Color,  backgroundColor:BackGroundColor}} >
    
     <div className={Styles.SubContainer}>
    <h2 className={Styles.h2}>#DEPhone</h2>
     <div id="LinkColection">
     <Link to ="/" >Phone Cases</Link>
    <Link to ="/about" >Chargers & Cables</Link>
    <Link to ="/users" >Screen Protectors</Link>      
    <Link to ="/" >Luxury Leather</Link>
    <Link to ="/about" >Tech Accessories</Link>
    <Link to ="/users" >Everyday Essentials</Link></div>
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

 <div className={Styles.CartContainer}> 
  <span className={Styles.span}>{NumberOfItems}</span>
  <FontAwesomeIcon icon={Basket}/>
 </div>
  </div>

   </div> 
   )

}

export default NavBar

window.addEventListener("scroll", function (event) {
  var NavBar=this.document.getElementById("NavBar");
  if (window.scrollY > 300) {
      NavBar.style.backgroundColor="black";
   }
  else{
    NavBar.style.backgroundColor="transparent";

  }
});




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