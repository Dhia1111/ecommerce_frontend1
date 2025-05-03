
 
 export async function  AddProduct(ProductName,ProductPrice,CatigoriesArry,SelectedImage) {




  const product = {
    "ID": 1,
    "Name": ProductName,
    "Price": ProductPrice,
    "ImageName": "laptop.png",
    "ImageUrl": ""
    
  };
  
  const formData=new FormData();
  formData.append('stproduct', JSON.stringify(product));

  // 3. Append the categories array (serialize it as JSON)
  formData.append('stcatigories', JSON.stringify(CatigoriesArry));
   
  // 4. Append the image file
  formData.append('image', SelectedImage);
 
 try{ 
  const response =await fetch(process.env.REACT_APP_URL_ADDNEWPRODUCT,{
    method:"Post",
    credentials:"include",
    body:formData,
})


if(response.ok )
{ 


  return    true

     

}
else{
return false
}

}catch{
return    false
}

}

export async function  UpdateProduct(ProductID,ProductName,ProductPrice,CatigoriesArry,SelectedImage) {

  console.log("Update product Catigories : "+CatigoriesArry)

console.log("PRoduct Price "+ ProductPrice)
 
  const product = {
    "ID": ProductID,
    "Name": ProductName,
    "Price": ProductPrice,
    "ImageName": "laptop.png",
    "ImageUrl": ""
    
  };
  
  const formData=new FormData();
  formData.append('stproduct', JSON.stringify(product));

  // 3. Append the categories array (serialize it as JSON)
  formData.append('stcatigories', JSON.stringify(CatigoriesArry));
   
  // 4. Append the image file
  formData.append('image', SelectedImage);
 
try{  const response =await fetch(process.env.REACT_APP_URL_UPDATEPRPDUCT,{
    method:"Post",
    credentials:"include",
    body:formData,
})

console.log(response) ;

if(response.ok )
{ 


  return  true

     

}
else{
return false
}

}catch(e){
return e
}

}

export async function DeleteProduct(ProductID) {


    
  try{const response =await fetch(process.env.REACT_APP_URL_DELETEPRODUCT,{
    method:"Post",
    credentials:"include",
    headers: { "Content-Type": "application/json" }, 

    body:JSON.stringify(ProductID),
 
})

if(response.ok )
{ 
    

  
  return true
     

}
else{
return false}
  }catch{
return false;
  }
    
}

export async function ShowProductList() {
    
   try{
    const response =await fetch(process.env.REACT_APP_URL_SHOWPRODUCTLIST,{
      method:"GET",
      credentials:"include",
      headers: { "Content-Type": "application/json" } 
   
  })

   const Data=await response.json();
  if(response.ok )
  { 
      
  

    return Data

       
  
  }
else{
  throw new Error(  "Server Error : " + Data?.message  )
}  
   }catch(e){
return e
   }
    
}

export async function GetProduct(ProductID) {

   try{
    const response =await fetch(process.env.REACT_APP_URL_GETPRODUCT+ProductID,{
      method:"GET",
      credentials:"include",
      headers: { "Content-Type": "application/json" } 
   
  })

  if(response.ok )
  { 
      
  
    
    return response.json()

       
  
  }
  return null;
  
   }catch{
return null
   }
    
}

export async function IsAthorized() {

 try{
  const response =await fetch(process.env.REACT_APP_URL_ISATHORIZED,{
    method:"GET",
    credentials:"include",
    headers: { "Content-Type": "application/json" } 
 
})

if(response.ok )
{ 
    

  
  return await response.json()

     

}
else return false;

 }
 catch{
  return false;

 }

}

export async function GetProductsForCatigory( stCatigoryID){

  const CatigoryID=Number(stCatigoryID)
  if(!CatigoryID){
    return;
  }

  if(CatigoryID>10||CatigoryID<1){
    console.log("Invalaid Catigory");
    return;
  }

try{
  
  const response =await fetch(process.env.REACT_APP_URL_GETALLPRODUCTSFROCATIGORY+CatigoryID,{
    method:"GET",
    credentials:"include",
    headers: { "Content-Type": "application/json" } ,
 })

const Data=await response.json();
if(response.ok )
{ 
    


  return  Data

     

}
else{return false}
}

catch{ return null;}




}


