
import { memo } from "react"
import Styles from "./Adress.module.css"

export default memo( function AdressForm({AdressData,Countries,Cities,PostCodes,handleChange}){

   console.log("Adress data  for Dome component : "+AdressData);

    async function OnChange(e){ 
         await handleChange(e)
    }

    return <div>

      
<div className={Styles.Container}>
      {Countries?.length>0&& <select
               name="country"
         value={AdressData?.country||Countries[0]||""}
        onChange={OnChange}
      >
         {Countries&&Countries.map((country, idx) => (
          <option key={idx} value={country}>{country}</option>
        ))}
      </select>}

    </div>

    <div>
      {Cities?.length>0&& <select
               name="city"
       value={AdressData?.city||Cities[0]||""}
       onChange={OnChange}
      >
         {Cities&&Cities.map((city, idx) => (
          <option key={idx} value={city}>{city}</option>

        ))}
      </select>}

    </div>
    
    <div>
 {   PostCodes?.length>0&&   <select
    name="postCode"
    value={AdressData?.postCode||PostCodes[0]||""}
    onChange={OnChange}
      >
         {PostCodes&&PostCodes.map((postcode, idx) => (
          <option key={idx} value={postcode}>{postcode}</option>
        ))}
      </select>}

    </div>
  

    </div>



})