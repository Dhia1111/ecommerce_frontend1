import Styles from "./Main.module.css";
import { LayOuts } from "../Data/MainData";
import NavBar from "../NavBar/NavBar";
import { useEffect, useRef, useState } from "react";
import SmallCard from "../SmallCard/SmallCard";
import TestImage from "../Images/Test.jpg"


export default function Main() {
const MainRef=useRef(null);
const Prve1Ref=useRef(null);
const Next1Ref=useRef(null);

const [Active,setAcitve]=useState(0);
useEffect(()=>{
  if(MainRef.current){

    let items= document.getElementsByClassName(Styles.SubContainer);
   if(items!==null&&items.length>0){

    if(items[Active]){ 

    MainRef.current.style.left=-items[Active].offsetLeft+"px";
    Prve1Ref.current.style.left=items[Active].offsetLeft+"px";
    Next1Ref.current.style.left= (items[Active].offsetLeft+items[Active].offsetWidth)+"px";
 

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
 
  }, 4000);

  // Cleanup interval on unmount or Active change
  return () => clearInterval(interval);


},[Active])


  return (
    <>
    
    <NavBar   className={Styles.Nav} Color="white" BackGroundColor="transparent" />

    <div className={Styles.Warper}>
       <div  id="Main" ref={MainRef} className={Styles.Container}>

    
{LayOuts.map((layout, index) => (
  <div key={index} id={`Section${index + 1}`} className={Styles.SubContainer }  >
    <img className={Styles.img} src={layout.image} alt="Main" />

    <div>

      <h2 className={Styles.h}>{layout.Title}</h2>
      <p className={Styles.p}>{layout.Paragtaph}</p>
      <button className={Styles.button}>{layout.ButtonText}</button>
      
    </div>
  </div>
))}

<button  id="Prev" ref={Prve1Ref} className={Styles.Prev} onClick={()=>{


 
    setAcitve((Active)=>{

      if(Active===0)
return LayOuts.length-1;
      else{
        return Active-1;
      }
    });
  
  
  }

} >&lt;</button>
<button id="Next" ref={Next1Ref} className={Styles.Next} onClick={()=>{ 
  
 
  
   setAcitve((Active)=>{

    if(Active===LayOuts.length-1){

      return 0;

    }
    else{
      return Active+1;
    }



   });
}
  
  
  }> &gt;</button>
</div>
</div>


    <div className={Styles.Container2}>

    <SmallCard image={TestImage} price="17" Name="Test SmallCard"/>      
    <SmallCard image={TestImage} price="17" Name="Test SmallCard"/>      
    <SmallCard image={TestImage} price="17" Name="Test SmallCard"/>      
    <SmallCard image={TestImage} price="17" Name="Test SmallCard"/>      
    <SmallCard image={TestImage} price="17" Name="Test SmallCard"/>      
    <SmallCard image={TestImage} price="17" Name="Test SmallCard"/>      
    <SmallCard image={TestImage} price="17" Name="Test SmallCard"/>      
    

    </div>
    
    </>
  );
}



//Change Ototmaticly

