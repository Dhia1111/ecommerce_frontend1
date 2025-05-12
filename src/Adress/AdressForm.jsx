
import { memo } from "react"
import Styles from "./Adress.module.css"

export default memo( function AdressForm({AdressData,Countries,Cities,PostCodes,handleChange}){


    async function OnChange(e){ 
         await handleChange(e)
    }

  

     return <div className={Styles.Main}>

      
<div className={Styles.Container}>
      {Countries?.length>0&& <select  className={Styles.Selecter}
               name="country"
         value={AdressData?.country||Countries[0]||""}
        onChange={OnChange}
      >
         {Countries&&Countries.map((country, idx) => (
          <option key={idx} value={country}>{country}</option>
        ))}


      </select>}

    </div>

    <div  className={Styles.Container}>
      {Cities?.length>0&& <select  className={Styles.Selecter}
               name="city"
       value={AdressData?.city||Cities[0]||""}
       onChange={OnChange}
      >
         {Cities&&Cities.map((city, idx) => (
          <option key={idx} value={city}>{city}</option>

        ))}
<input value={"Test"}  placeholder="Test"/>

      </select>}

    </div>
    
    <div  className={Styles.Container}>
 {   PostCodes?.length>0&&   <select  className={Styles.Selecter}
    name="postCodeAndLocation"
    value={AdressData?.postCodeAndLocation||PostCodes[0]||""}
    
    onChange={OnChange}>


     
    {PostCodes&&PostCodes.map((postcode, idx) => (
          <option key={idx} value={postcode}>{postcode}</option>
        ))}

      </select>}


    </div>
  

    </div>
   }

 

)