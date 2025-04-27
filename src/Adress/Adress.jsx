

import { useCallback, useEffect, useState } from "react"
import { GetCities, GetCountries, GetPostCodes } from "../APIs/Location"
 


  function Adress(PersonInf){
    console.log("Adress ")

     const [AdressData,setAdressData]=useState({

        country:"",
        city:"",
        postCode:"",

     })
     const [Countries,setCountries]=useState([])
     const [Cities,setCities]=useState([])
     const [PostCodes,setPostCodes]=useState([])


 
    useEffect(()=>{

        if(!PersonInf)return
        async function HandleLoad() {
            if(PersonInf){

                if(PersonInf?.country&&PersonInf.country!==""){
                    setAdressData(p=>({

                        ...p,
                    country:PersonInf.country,

                   }));
    
                    const Countries= await GetCountries()
               
                  setCountries(Countries||[]);
   let Cities=[];
                    
                         Cities= await GetCities(PersonInf?.country||Countries[0]||"")
                         setCities(Cities||[]);

                    
                        setAdressData((p)=>({...p,city:Cities[0]||PersonInf?.city||""}))
                    

                
                    const PostCodes=await GetPostCodes(PersonInf?.country||"",PersonInf?.city||"")||[];

                    setAdressData((p)=>({...p,postCode:PersonInf?.postCode||PostCodes[0]||""}))
   setPostCodes(PostCodes);
                  
                }
                else{

                    const Countries=await GetCountries();

                    setCountries(Countries||[]);
                    setAdressData((p)=>({...p,country:Countries[0]||""}))

                    if(Countries[0]){
                        const Cities=await GetCities(Countries[0])||[]
                        setAdressData((p)=>({...p,city:Cities[0]||""}))

                        setCities(Cities)

                        if(Cities[0]){

                            const PostCodes=GetPostCodes(Countries[0],Cities[0])||[]
                            setAdressData((p)=>({...p,postCode:PostCodes[0]||""}))

                            setPostCodes(PostCodes);
                            
                        }
                    }


                }
            }
        }

           HandleLoad();
  


    },[PersonInf])


    const handleChange=useCallback((e)=>{

        const { name}=e.target;

        function  handlAdressChange (e){

  
            const { name, value } = e.target;
            
            setAdressData(prev => {
              // if nothing actually changed, return the same object → no rerender
              if (prev[name] === value) return prev;
              // otherwise spread in the new value
              return { ...prev, [name]: value };
            });
        
          };
        
          async function HandCityChange(e) {
            handlAdressChange(e);

            
            const { value } = e.target;
        
        
        
        if(Cities.length!==0){
        
         //set New Posts
         const NewPosts=await GetPostCodes(AdressData.country,value)||[]
         setPostCodes(NewPosts);
         const PostCode0=NewPosts[0]
         setAdressData(prev => ({ ...prev, postCode: PostCode0 }));
        
        }  
        else{
          setAdressData(prev => ({ ...prev, postCode: "" }));
        
        }
        
        
        
        }
        
          async function HandCountryChange(e) {
            handlAdressChange(e);  
            const country = e.target.value;
          // updates PersonData.country
            const dtCities = await GetCities(country) || [];
            setCities(dtCities);
          
            if (dtCities.length > 0) {
              const city0 = dtCities[0];
              // update PersonData.city if you want
              setAdressData(prev => ({ ...prev, city: city0 }));
              const dtPostCodes = await GetPostCodes(country, city0) || [];
              setPostCodes(dtPostCodes);
              if(dtPostCodes.length!==0){
                setAdressData(prev => ({ ...prev, postCode: dtPostCodes[0] }));
        
          
              }else{
                setAdressData(prev => ({ ...prev, postCode: "" }));
        
                
              }
            } else {
                setAdressData(prev => ({ ...prev, city: "" }));
              setPostCodes([]);
            }
        
            
            
        }
    
       if(name==="country"){

        HandCountryChange(e);

       }

       else if(name==="city"){

        HandCityChange(e)
       }

        else if(e.target.name==="postCode"){

            handlAdressChange(e)
        }
    
     },[AdressData,Cities])
    
 

   
     return {AdressData,Countries,Cities,PostCodes,handleChange}
 
    }

   export default  Adress

 
  



