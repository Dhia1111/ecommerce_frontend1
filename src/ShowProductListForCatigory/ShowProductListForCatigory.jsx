import Styles from "./ShowProductistFroCatigory.module.css"
import { useLoaderData } from "react-router-dom";
import { GetProductsForCatigory } from "../APIs/Products";
import SmallCard from "../SmallCard/SmallCard";
import NavBar from "../NavBar/NavBar";

export default function ShowCatiory(){

const{Title,List}=useLoaderData();

return(

<>
<NavBar Postion="relative" Color="black"/>

{Title&&<h2 className={Styles.HeadLine}>{Title}</h2>}


<div className={Styles.List}>

{
  List&&
 
 List.map((product)=>(
    
  
  <SmallCard key={product.id} id={product.id} price={product.price} Name={product.name} image={product.imageUrl} />
   


    
    
    ))
}
</div>
</>

)

}

export async function Loader({request}){

    let Titles=["BestSaling","populer","New","PhoneCases","Chargers","Cables","ScreenProtectors","Luxury_Leather","Tech_Accessories","EveryDay_Essentials"]

    const url = new URL(request.url);
        const CatigoryID = url.searchParams.get('CatigoryID');  

        if(Number.parseInt(CatigoryID)){
            
        
        const List=await GetProductsForCatigory(CatigoryID);
        const Title=Titles[Number(CatigoryID)-1];
        console.log("title :"+Title)
     return   {List,Title}
    
    
    }
    else{
        return null
    }

        
}