

 
 import Styles from "./Payment.module.css"
import {  useLoaderData } from "react-router-dom"
import {GetPersonInf} from "../APIs/Customer.js"
import { CardNumberElement,CardCvcElement,CardExpiryElement,Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useStripe ,useElements} from "@stripe/react-stripe-js";
import {  useState } from "react";
import { Form } from "react-router-dom";
import { DeleteAll } from "../State/CartItems/CartItems.ts";
 import Adress from "../Adress/Adress.jsx"
import AdressForm from "../Adress/AdressForm.jsx";
import PaymentProductsList from "./PaymentProductsList.jsx";


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  
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
    console.log("Run Payment")
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
  const {AdressData,Countries,Cities,PostCodes,handleChange}=Adress(PersonInf);
  
   const Dispatch=useDispatch();

   console.log("Adress data  for payment : "+JSON.stringify(AdressData||""));


 function OnhandleChange(e){
  const { name, value } = e.target;
    
  if(!PersonInf){
return;
  }
         
  if(name==="Phone"&&PersonInf?.phone){
    PersonInf.phone=value;
  }
 if(name==="FirstName"&&PersonInf?.firstName){
  PersonInf.firstName=value
 }
 if(name==="LastName"&&PersonInf?.LastName){
  PersonInf.LastName=value
 }

  }


  async function Onsubmit(event){

  
    event.preventDefault();
 
   if(MyElements===null||Strip===null){
            setMessage("thier is an empty elemnst pleas enter you inf ");
        }
        setLoading(true);
        console.log("Payment is in process and  strip elements are valiad");
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

//Set PersonInf 

   



 console.log("calling API");


const url=process.env.REACT_APP_URL_PAYMENT;
try{
 
const Response =await fetch(url,{

    method:"POST",
    credentials:"include",
    headers: { "Content-Type": "application/json" },


    body: JSON.stringify(
{
      "inCludedProductList":CartItmesList,

      "paymentMethodID": paymentMethod.id.toString(),

      "personInf": {
        "personID": 0,
        "firstName": PersonInf?.firstName||"",
        "lastName": PersonInf?.lastName||"",
        "email": PersonInf?.email||"",
        "phone": PersonInf?.phone||'',
        "country": AdressData.country,
        "postCodeAndLocation": AdressData.postCode,
        "city": AdressData.city
      } 

})
       
    

})
if (!Response.ok) {
  // handle non-2xx HTTP statuses
  const FetchingData=await Response.json();
  throw new Error(`Server error | Message : ${FetchingData.message} | ErrorType :${FetchingData.errorType}`);
}
else{
//Take the SecretPaaymentId and use it to confirem the payment using stripe 
const Data=await Response.json();
    const ClientSecret=Data?.clientSecret||"";
if(ClientSecret===""){
  setLoading(false); 
  setMessage("Payment failed due to server error")
  return
}

//handle finsh payment in client site 
const { error: stripeError, paymentIntent } = await Strip.confirmCardPayment(
  ClientSecret,
  {
    payment_method: {
      card: CardNumber,
    
    },
    return_url:process.env.REACT_APP_URL_GETFRONT_STATUSUrl
  }
);

if (stripeError) {
  setLoading(false);

  setMessage("Stripe Error "+stripeError.message);

} else if (paymentIntent.status === "succeeded") {
  setLoading(false)
  setMessage("Payment added secsessfuly ")
  Dispatch(DeleteAll());

}

   

}

}catch(e){
  
    
  setLoading(false);
    
  setMessage("Payment failed => "+e)
    return 

}




 
    }

    const cardStyle = {
        style: {
          base: {
            fontSize: "23px",
            color: "#333"
            
          ,}}
        
      };
    
    return <>
 
  <h2 className={Styles.Note}>!!!!!! This is a test Page do not use your Card Information </h2>
  <a href="https://docs.stripe.com/testing" target="_blank" rel="noopener noreferrer" className={Styles.StripeTestPage}>Test Cards from Stripe</a>

 {PersonInf&&    

   <>
         {Message&&<p>{Message}</p>}
 
      <div className={Styles.Container}>
        <PaymentProductsList/>
        <div className={Styles.SubContainer}>

     
        <div className={Styles.PersonInf}>
        <h3>Personal information</h3>
     
        <input
        type="text"
        name="FirstName"
        defaultValue={PersonInf?.firstName||""}
        onChange={OnhandleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="LastName"
        defaultValue={PersonInf?.lastName||""}
        onChange={OnhandleChange}
        placeholder="Last Name"
      />
      <input
        type="text"
        name="Phone"
        defaultValue={PersonInf?.phone ||""}
        onChange={OnhandleChange}
        placeholder="Phone"
      />
 
  <AdressForm AdressData={AdressData} Countries={Countries} Cities={Cities} PostCodes={PostCodes} handleChange={handleChange}/>
 
      </div>

     <Form className={Styles.CartInf}  onSubmit={(e)=>Onsubmit(e)
     } method="POST">
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
  
  
  const  PersonInf  = await GetPersonInf()||null;
 
  return  PersonInf
  

 }