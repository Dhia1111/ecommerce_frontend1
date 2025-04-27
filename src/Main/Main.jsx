import Styles from "./Main.module.css";
import { LayOuts } from "../Data/MainData";
import NavBar from "../NavBar/NavBar";
import { useEffect, useRef } from "react";
import { GetProductsForCatigory } from "../APIs/Products.js";
import SmallCard from "../SmallCard/SmallCard.jsx"


import { useLoaderData } from "react-router-dom";

let ItemIndex=0;

export default function Main() {
const MainRef=useRef(null);
const {NewProduct,PopulerProduct,BestSelling}=useLoaderData();

useEffect(()=>{


  const interval = setInterval(() => {
    if(MainRef.current){

      let items= document.getElementsByClassName(Styles.SubContainer);
     if(items!==null&&items.length>0){
  
      if(items[ItemIndex]){ 
  
      MainRef.current.style.transform = `translateX(-${items[ItemIndex].offsetLeft}px)`
   
      }
    
  else{
    console.log("Could not read off set left")
  }
     
     }
    }
ItemIndex= ItemIndex === LayOuts.length - 1 ? 0 : ItemIndex + 1;

    
    ;
 
  }, 2000);

  // Cleanup interval on unmount or Active change
  return () => clearInterval(interval);


},[])


  return (
    <>
    
    <NavBar  Postion="absolute" className={Styles.Nav} Color="white" BackGroundColor="transparent" />
    

  <div className={Styles.Warper}>

 <div  id="Main" ref={MainRef} className={Styles.Container}>

    
{LayOuts.map((layout, index) => (
  <div key={index} id={`Section${index + 1}`} className={Styles.SubContainer }  >
    <img loading="lazy" className={Styles.img} src={layout.image} alt="Main" />
 
  </div>
))}


</div>
<h2 className={Styles.HeadLine}>New</h2>

<div className={Styles.List}>

{
  NewProduct&&
 
 NewProduct.map((product)=>(
    
  
  <SmallCard key={product.id} id={product.id} price={product.price} Name={product.name} image={product.imageUrl} />
   


    
    
    ))
}
</div>
 
<h2 className={Styles.HeadLine}>Populer</h2>

<div className={Styles.List}>

{
  PopulerProduct&&
 
  PopulerProduct.map((product)=>(
    
  
  <SmallCard key={product.id} id={product.id} price={product.price} Name={product.name} image={product.imageUrl} />
   


    
    
    ))
}


</div>
<h2 className={Styles.HeadLine}>Best Saling</h2>

<div className={Styles.List}>

{
  BestSelling&&
 
  BestSelling.map((product,index)=>(
    
  
  <SmallCard key={index+1} id={product.id} price={product.price} Name={product.name} image={product.imageUrl} />
   


    
    
    ))
}


</div>
</div>

 

    </>
  );
}




export async function Loader(){
 
 const[NewProduct,PopulerProduct,BestSelling]=  await Promise.all([GetProductsForCatigory(3), GetProductsForCatigory(2),GetProductsForCatigory(1)]);
   return  { NewProduct, PopulerProduct,BestSelling };
    
  }
  
