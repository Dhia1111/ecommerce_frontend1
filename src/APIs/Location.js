
export async function GetCountries(){
    try{
       const Responce= await fetch(process.env.REACT_APP_URL_GETCOUNTRIES,{
        method:"GET",
        headers: { "Content-Type": "application/json" },         
        
      })
      const Data =await Responce.json();
      if(Responce.ok){
      return  Data;
      
      }
      if(!Responce.ok){
        throw new Error( Data?.message)
      }
  
    }catch(e){
  
      console.log("Error:"+ e);
      return []

    }
  }

  
export async function GetPostCodes(CountryName,CityName){
    try{
       const Responce= await fetch(process.env.REACT_APP_URL_GETPOSTCODES+CountryName+"/"+CityName,{
        method:"GET",
        headers: { "Content-Type": "application/json" },         
        
      })
      const Data =await Responce.json()
      if(Responce.ok){
      return   Data;
      
      }
      if(!Responce.ok){
        throw new Error(Data?.message)
      }
  
    }catch(e){
  
      console.log("Error:"+ e);
      return []

    }
  }

  export async function GetCities(CountryName){
    try{
      const Responce= await fetch(process.env.REACT_APP_URL_GETCITIES+CountryName,{
        method:"GET",
        headers: { "Content-Type": "application/json" },         
        
      })
      const Data =await Responce.json()
      if(Responce.ok){
      return  Data
      
      }
      if(!Responce.ok){
        throw new Error(Data?.message)
      }
  
    }catch(e){
  
      console.log("Error:"+ e);
      return []
    }
  }

  