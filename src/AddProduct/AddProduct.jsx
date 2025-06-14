

import { useEffect, useRef, useState } from "react"
import Styles from "./AddProduct.module.css"
import {AddProduct as AddNewProduct} from "../APIs/Products.js"
import { useLoaderData } from "react-router-dom";
import { IsAthorized } from "../APIs/Products.js";
 let  CatigoriesArry =[];
 let ProductName="";
 let ProductPrice=0;
export default function AddProduct(){
    const [ImageURL,setPreviewUrl]=useState();
    const [SelectedImage,setSelectedImage]=useState();
    const [requestError,setError]=useState();
    const [responceMessage,setResponceMessage]=useState();
    const [Loading,setLaoding]=useState(false)
    const IsUserAthorized=useLoaderData();
     
    const FileRef=useRef();

useEffect(()=>{

   CatigoriesArry=[];
ProductPrice=0;
ProductName="";

},[])
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedImage(file);
          // Generate temporary URL for preview
          const url = URL.createObjectURL(file);
          setPreviewUrl(url);
        }
      };

      const handleClearImage = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        // Reset the file input value
        if (FileRef.current) {
          FileRef.current.value = ''; // Directly reset the input
        }
        // Revoke temporary URL to free memory
        if (ImageURL) {
          URL.revokeObjectURL(ImageURL);
        }
      };
    
   function HandleCatigories(e){
      
    const value = e.target.value;
 
    const isChecked = e.target.checked;
 
    if (isChecked) {
        CatigoriesArry.push(value); // Mutate the array
       } 
    else {
        CatigoriesArry = CatigoriesArry.filter((k) => k !== value); 
    }
  }

     async function HandleAdd(e){
//validation
setResponceMessage("");
if(ProductPrice<=0){
   setError("Product Process must be more then 0");
   return;
}

if(!ProductName){
         setError("you must set the product Name")
         return;
      }

if(ProductName.length===0){
   setError("you must set the product Name");
   return;


}


if(!SelectedImage){
setError("you must select an image");
return;

}

if(SelectedImage.length===0){
setError("you must select a valiad image");
return;


}
if(CatigoriesArry.length===0){
   setError("you must at les choose one Category ")
return;
}
setError("");

setLaoding(true);
const result= await AddNewProduct(ProductName,ProductPrice,CatigoriesArry,SelectedImage)
setLaoding(false);
setResponceMessage(result);


}

function handlePriceChange(e)  {
   let inputValue = e.target.value;

   if (inputValue === ""||inputValue<0) {
      ProductPrice=0;
      e.target.value=ProductPrice;

     return;
   }


   const parts = inputValue.split(".");
   if (parts.length === 2 && parts[1].length > 2) {
      e.target.value=ProductPrice;
     return; 
   }


   ProductPrice=e.target.value;


};

  




    return(

  
       <>
       {  IsUserAthorized&&
         <>
         <h2>Add Product</h2> 
         {requestError&&<h3>{requestError}</h3>}
         {responceMessage&&<h3>{responceMessage}</h3>}
          <div className={Styles.AddProductJsx}>
          <div className={Styles.Container}>
          <div className={Styles.ContainerImg}>       
           
          <div>
       
           <img src={ImageURL} alt=""/>
       
               
           </div>
       
           <input    type="file"    accept="image/*"    onChange={handleImageChange}    ref={FileRef}   style={{ display: 'none' }}    />
        <div className={Styles.btnContainer}>  
           <button onClick={()=>{
               if(FileRef.current){
                   FileRef.current.click();
               }
           }}>chose
       
           </button>
           <button onClick={handleClearImage}>delete</button></div>
       </div>
       
       <input type="text" onChange={(e)=>{ProductName=e.target.value;}} placeholder="Product Name"/>
       <input type="number"  defaultValue={0}  onChange={(e)=>{
         
      
          handlePriceChange(e)
  
         }
         
         
         }  placeholder="Price($)"/>
       
       </div >
       <div className={Styles.CatigoriesContainer}>
       <h3> Product Catigories</h3>
       <div className={Styles.Catigories}>
          
          <label >
          BestSaling
       
       <input onClick={(e)=>HandleCatigories(e)}  value={1} type="checkbox"/>
       
          </label>
       
          <label >
       populer
       
       <input onClick={(e)=>HandleCatigories(e)} value={2} type="checkbox"/>
       
          </label>
       
          <label >
          New
       
       <input onClick={(e)=>HandleCatigories(e)}  value={3} type="checkbox"/>
       
          </label>
       
          <label>
          PhoneCases
       
       <input onClick={(e)=>HandleCatigories(e)}  value={4} type="checkbox"/>
       
          </label>
       
          <label >
          Chargers
       
       <input onClick={(e)=>HandleCatigories(e)} value={5} type="checkbox"/>
       
          </label>
       
          <label>
          Cables
       
       <input onClick={(e)=>HandleCatigories(e)}  value={6} type="checkbox"/>
       
          </label>
       
          <label>
          ScreenProtectors
       
       <input onClick={(e)=>HandleCatigories(e)} value={7} type="checkbox"/>
       
          </label>
       
          <label >
          Luxury_Leather
       
       <input  onClick={(e)=>HandleCatigories(e)} value={8} type="checkbox"/>
       
          </label>
       
          <label >
          Tech_Accessories
       
       <input onClick={(e)=>HandleCatigories(e)}  value={9} type="checkbox"/>
       
          </label>
       
          <label >
          EveryDay_Essentials
       
       <input onClick={(e)=>HandleCatigories(e)}  value={10} type="checkbox"/>
       
          </label>
       </div>
       
       <button className={Styles.btnAdd} disabled={Loading} onClick={(e)=>HandleAdd(e)}>{Loading?"Loading...":"Add"}</button>
       
       
       </div>
       
       
       
        </div>
           </>
       }

       {!IsUserAthorized&&<h2>Your not Athorized to AddProductPage</h2>}
       </>


    )


}
export async function Loader(){


 return await IsAthorized(32);

    
}