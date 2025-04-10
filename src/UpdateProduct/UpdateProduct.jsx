 import { useLoaderData, useRevalidator } from "react-router-dom";
import {UpdateProduct as UpdateProductAPI ,GetProduct,IsAthorized} from "../APIs/Products.js"
import Styles from "./UpdateProduct.module.css"
import { useRef, useState } from "react";



let  CatigoriesArry =[];
let ProductName="";
let ProductPrice=0;
let ProductID=-1;

function FindInCatigories(value) {
   for (let element of CatigoriesArry) {
      if (element === value) return true;
   }
   return false;
 }
export default function UpdateProduct(){

const {IsUserAthorized, LoaderData}=useLoaderData();
const [ImageUrl,setImageUrl]=useState(null);
const [SelectedImage,setSelectedImage]=useState(null)
const [requestError,setError]=useState();
const [responceMessage,setResponceMessage]=useState();
const [Loading,setLaoding]=useState(false)
const FileRef =useRef();
const {revalidate}=useRevalidator();

if(LoaderData){     
   CatigoriesArry=[];
     LoaderData.catigories.forEach(e=>{CatigoriesArry.push(Number(e))})


}

function handleImageChange(e){

    console.log("handleImageChange");
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
       const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
}


const handleClearImage = () => {
   
    setSelectedImage(null);
    setImageUrl(null);
     if (FileRef.current) {
      FileRef.current.value = '';  
    }
    
    setImageUrl(null);
        
  };


function HandleCatigories(e){

   const value = Number(e.target.value);

   if(e.target.checked){
 
      //add the elemnt to arry 
      
      CatigoriesArry.push(value);

   }
   else{

      //delete the elment from the arry
   CatigoriesArry= CatigoriesArry.filter(item => item !== value);
     

   }
   
 }

async function UpdateProductEvent(){
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


 
 
setError("");

setLaoding(true);

const result =  await UpdateProductAPI(ProductID,ProductName,ProductPrice,CatigoriesArry,SelectedImage);
setLaoding(false);
if(result){


   setResponceMessage("Product Added secsessfuly");
   console.log("LoaderData.imageUrl "+LoaderData.imageUrl)
   console.log("ImageUrl "+ImageUrl)

   handleClearImage();
   revalidate();
   

}
else{
   setResponceMessage("Product Adding failed");
}

}


  

  if(IsUserAthorized){
   if(LoaderData){
        
      ProductID=LoaderData.id;
      ProductName=LoaderData.name;
      ProductPrice=LoaderData.price;
     return(
        <>        
           <h2>Update Proudct</h2>
           {requestError&&<h3>{requestError}</h3>}
           {responceMessage&&<h3>{responceMessage}</h3>}
         <div className={Styles.MainContainer}>
          
                <div className={Styles.Container} > 
        
                <img src={ImageUrl===null?LoaderData.imageUrl:ImageUrl} alt={LoaderData.name}/>
                
                <div className={Styles.btnContainer}>  

               <button className={Styles.btn} onClick={()=>{  if(FileRef.current!==null){   FileRef.current.click();      }   }}>chose </button>
    
              <button  className={Styles.btn} onClick={handleClearImage}>delete</button></div>

                <input type="text"  defaultValue ={LoaderData.name} onChange={(e)=>{ProductName=e.target.value}} placeholder="Name"/>
                <input type="number" defaultValue={ProductPrice} onChange={(e)=>{ProductPrice=Number(e.target.value);console.log("Prduct on change : "+ProductPrice)}} name="Price" placeholder="Price"   />
                <input    type="file"    accept="image/*"    onChange={(e)=>handleImageChange(e)}    ref={FileRef}   style={{ display: 'none' }}    />
             
                
                
                
            

            
                </div>
        <div className={Styles.Catigories}>
        <h2 className={Styles.h2}>Catigories</h2>

           <label >
           BestSaling
        
        <input defaultChecked={FindInCatigories(1)}   onClick={(e)=>HandleCatigories(e)}  value={1} type="checkbox"/>
        
           </label>
        
           <label >
        populer
        
        <input defaultChecked={FindInCatigories(2)} onClick={(e)=>HandleCatigories(e)} value={2} type="checkbox"/>
        
           </label>
        
           <label >
           New
        
        <input  defaultChecked={ FindInCatigories(3)}  onClick={(e)=>HandleCatigories(e)}  value={3} type="checkbox"/>
        
           </label>
        
           <label>
           PhoneCases
        
        <input defaultChecked={FindInCatigories(4)} onClick={(e)=>HandleCatigories(e)}  value={4} type="checkbox"/>
        
           </label>
        
           <label >
           Chargers
        
        <input defaultChecked={FindInCatigories(5)} onClick={(e)=>HandleCatigories(e)} value={5} type="checkbox"/>
        
           </label>
        
           <label>
           Cables
        
        <input defaultChecked={FindInCatigories(6)} onClick={(e)=>HandleCatigories(e)}  value={6} type="checkbox"/>
        
           </label>
        
           <label>
           ScreenProtectors
        
        <input defaultChecked={FindInCatigories(7)} onClick={(e)=>HandleCatigories(e)} value={7} type="checkbox"/>
        
           </label>
        
           <label >
           Luxury_Leather
        
        <input  defaultChecked={FindInCatigories(8)} onClick={(e)=>HandleCatigories(e)} value={8} type="checkbox"/>
        
           </label>
        
           <label >
           Tech_Accessories
        
        <input defaultChecked={FindInCatigories(9)} onClick={(e)=>HandleCatigories(e)}  value={9} type="checkbox"/>
        
           </label>
        
           <label >
           EveryDay_Essentials
        
        <input defaultChecked={FindInCatigories(10)} onClick={(e)=>HandleCatigories(e)}  value={10} type="checkbox"/>
        
           </label>

           <button className={Styles.btn} disabled={Loading} onClick={UpdateProductEvent}>{Loading?"Loading....":"Update"}</button>

        </div>

            </div>

            </>
         )
 }

else{
 return <h2>thier is not Product to Update </h2>
}

  }
  else{
   return(<h2>You are not Athorized to the UpdatePage</h2>)
  }





}


export async function Loader({request}) {

    const IsUserAthorized=  await IsAthorized();
    
        if(!IsUserAthorized)   return { IsUserAthorized};
            
       
    const url = new URL(request.url);

    const ProductID = url.searchParams.get('ProductID');  

     if(!ProductID)  return {IsUserAthorized};

     const LoaderData=await GetProduct(ProductID);

   return {IsUserAthorized,LoaderData} 

}