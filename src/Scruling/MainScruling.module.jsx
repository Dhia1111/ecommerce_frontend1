import { LayOuts } from "../Data/MainData";
import Styles from "./Main.module.css"
import { useRef,useState,useEffect, memo } from "react";

export default memo( function Scruling()
{
  const MainRef=useRef(null);
  const [Active,setAcitve]=useState(0);

  useEffect(()=>{
    if(MainRef.current){
  
      let items= document.getElementsByClassName(Styles.SubContainer);
     if(items!==null&&items.length>0){
  
      if(items[Active]){ 
  
        MainRef.current.style.transform = `translateX(-${items[Active].offsetLeft}px)`
   
  
      }
    
  else{
    console.log("Could not read off set left")
  }
     
     }
    }
  
    const interval = setInterval(() => {
      setAcitve((prevActive) => (prevActive === LayOuts.length - 1 ? 0 : prevActive + 1));
      //set prev and next postions 
  
      
      ;
   
    }, 2000);
  
    // Cleanup interval on unmount or Active change
    return () => clearInterval(interval);
  
  
  },[Active])
  
  
    return (
      
      
      
   <div className={Styles.Warper}>
  
   <div  id="Main" ref={MainRef} className={Styles.Container}>

 {

 LayOuts&&LayOuts.map((layout, index) => (

   <div key={index} id={`Section${index + 1}`} className={Styles.SubContainer }  >
     <img loading="lazy" className={Styles.img} src={layout.image} alt="Main" />
  
   </div>
   
 ))
 }
 
 </div>
 </div>

)
})