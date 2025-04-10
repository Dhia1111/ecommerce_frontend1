import Styles from "./Payment.module.css"
import { useLoaderData } from "react-router-dom"
import {GetPersonInf} from "../APIs/Customer.js"
import { CardNumberElement,CardCvcElement,CardExpiryElement,Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useStripe ,useElements} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";



import CartItem from "../Cart_Item/Cart_Item.jsx";

const stripePromise = loadStripe("pk_test_51Qo4yb00xA9CLJuHawbJeJaL6MvI9ZisSHNMdiMk2BoUTk0kKjv3XDtlY0jo4rC2TBmpRcvv8AMk0N08W7sAelDy00C0EfFdwZ");
  
const cardImages = {
  visa: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
  mastercard: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  amex: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
  discover: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Discover_Card_logo.svg",
  diners: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Diners_Club_Logo3.svg",
  jcb: "https://upload.wikimedia.org/wikipedia/en/0/0d/JCB_logo.svg",
  unionpay: "https://upload.wikimedia.org/wikipedia/commons/2/2e/UnionPay_logo.svg",
  unknown: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Creditcard-unknown.svg",
};




  function PaymentJSX(){
  
  const Strip=useStripe();
  const MyElements=useElements();
  const[Loading,setLoading]=useState(false);
  const[Message,setMessage]=useState("");
  const [cardBrand, setCardBrand] = useState("unknown");
  const [CardNumerErrore,setCardNumberErrore]=useState(true);
  const [ExparationErrore,setExparationErrore]=useState(true);
  const [CVCErrore,setCVCErrore]=useState(true);
  const CartItmesList=useSelector((state)=>state.CartItems.value);
  const PersonInf=useLoaderData();

   const [PersonData, setPersonInf] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    city: "",
    postCode: ""
    ,email:"" 
  });

  useEffect(()=>{

    if(PersonInf!=null){
      setPersonInf({
        firstName:PersonInf.firstName,
        lastName: PersonInf.lastName,
        phone: PersonInf.phone,
        country: PersonInf.country,
        city: PersonInf.city,
        postCode: PersonInf.postCode
        ,email:PersonInf.email
      })
    }
  },[PersonInf])
  

  const handleChange = (e) => {
  
    const { name, value } = e.target;
    setPersonInf(prev => ({
      ...prev,
      [name]: value
    }));
  };
 
  async function Onsubmit(event){

    event.preventDefault();

   if(MyElements===null||Strip===null){
            setMessage("thier is an empty elemnst pleas enter you inf ");
        }
        setLoading(true);
        console.log("Payment is in process andy strip ,elements are valiad");
        setMessage("");
        
        const CardNumber=MyElements.getElement(CardNumberElement);
        
        if (!CardNumber) {
            setMessage("Card elements not found.");
            setLoading(false);
            return;
        }
       const {error,paymentMethod}=await Strip.createPaymentMethod({
        type:"card",
        card:CardNumber
    })
            
;

if(error){
    console.log("PaymentMethodError");

    setMessage("Coud not complet the payment ");
    setLoading(false);
    return;

}
else{
    console.log( "PaymentMethod : "+ paymentMethod.id);
}
//create a Guid  to send to the payment  to make sure the user does not pay toise and store it into ;
 
console.log(PersonData)
console.log("calling API");


const url=process.env.REACT_APP_URL_PAYMENT;
 
const Response=await fetch(url,{

    method:"POST",
    credentials:"include",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(
{
      "inCludedProductList":CartItmesList,

      "paymentMethodID": paymentMethod.id.toString(),

      "personInf": {
        "personID": 0,
        "firstName": PersonData.firstName,
        "lastName": PersonData.lastName,
        "email": PersonData.email,
        "phone": PersonData.phone,
        "country": PersonData.country,
        "postCode": PersonData.postCode,
        "city": PersonData.city
      } 

})
       
    

}).catch((error)=>{

    setLoading(false);
    setMessage("error : "+error.message);
    return;
})

if(Response.ok){

    setLoading(false);
    const FetchingData=await Response.json();
    setMessage("Payment added secsessfuly "+FetchingData.message)


}else{

  const FetchingData=await Response.json();
    setLoading(false);
    setMessage("Payment field "+FetchingData.message)


}

//delete the old GUID and create a new one .

    }

    

    
    const ProductList=useSelector((state)=>state.CartItems.value);
 
    
    const cardStyle = {
        style: {
          base: {
            fontSize: "23px",
            color: "#333"
            
          ,}}
        
      };
    
    return <>
 
 {PersonInf&&    

   <>
      <div className={Styles.Container}>
        <div className={Styles.SubContainer}>

        <div className={Styles.List}>
        <h3 className={Styles.h3}>List</h3>

        {
          ProductList&& ProductList.map((item) => (
          
        
          <CartItem key={item.ProductID} ID={item.ProductID} Name={item.Name} price={item.Price} NumberOfProduct={item.NumberOfItems} image={item.Image} />
          
           

          ))
        }


        </div>
    
        <div className={Styles.PersonInf}>
        <h3>Personal information</h3>
        <input
        type="text"
        name="firstName"
        defaultValue={PersonInf.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        defaultValue={PersonInf.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="text"
        name="phone"
        defaultValue={PersonInf.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <input
        type="text"
        name="country"
        defaultValue={PersonInf.country}
        onChange={handleChange}
        placeholder="Country"
      />
      <input
        type="text"
        name="city"
        defaultValue={PersonInf.city}
        onChange={handleChange}
        placeholder="City"
      />
      <input
        type="text"
        name="postCode"
        defaultValue={PersonInf.postCode}
        onChange={handleChange}
        placeholder="Post Code"
      />
 
      </div>

      {Message&&<p>{Message}</p>}
     <Form className={Styles.CartInf}  onSubmit={Onsubmit} method="POST">
    {CardNumerErrore&&<p>Invalaid CardNumber</p>}
    <div className={Styles.lableAndElement}> 
    <label >Card Number</label>
    
    <div className={Styles.imgCardNumberBox}> 
    {cardBrand!=="unknown"&&<img className={Styles.img} src={cardImages[cardBrand]} alt="Card Brand"  />
}
<CardNumberElement options={cardStyle} className={Styles.input}  onChange={(event) =>{
    
    setCardBrand(event.brand || "unknown");
     if(event.error||event.empty||!event.complete){
 
        setCardNumberErrore(true);
     }
         else setCardNumberErrore(false);
         
         
  }}   />
</div>

</div>

{CVCErrore&&<p>Invalaid CVC</p>}
<div className={Styles.lableAndElement}>  <label >CVC</label>
  <CardCvcElement options={cardStyle}  className={Styles.input}   onChange={(event)=>{ 
     if(event.error||event.empty||!event.complete){

        setCVCErrore(true);

 } else  setCVCErrore(false);

 }}/>
</div>
{ExparationErrore&&<p>Invalaid Exparation Date</p>}
<div className={Styles.lableAndElement}>  <label >Ecparation Date</label>
  <CardExpiryElement options={cardStyle}  className={Styles.input}   onChange={(event)=>{ 
     if(event.error||event.empty||!event.complete){

      setExparationErrore(true);

} else  {setExparationErrore(false);
 
}
}}/>

</div>
 

 
           <input type="submit" disabled={!Strip||MyElements===null||Loading||CVCErrore||ExparationErrore||CardNumerErrore?true:false} value={Loading?"Loading...":"Buy"}/>
    </Form>
    

        </div>  
         
         
        
    </div>
   </>
         
     }
     {(!PersonInf)&&<h2>thier is no user Inf Loaded ,you may need to log in again</h2>}


    </>

}



export default function Payment(){
  return(
  <>
  <Elements stripe={stripePromise}>

<PaymentJSX/>

  </Elements>

  </>
  )
}


export async function Loader(){

  return await GetPersonInf();
    
 }