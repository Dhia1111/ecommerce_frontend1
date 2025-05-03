import { useLoaderData } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function PaymentStatus(){

const DataLoader=useLoaderData()

if(DataLoader==="succeeded"){
    return (<h2 style={{color:"green"}}>

        {DataLoader}
        
        </h2>)
}
else{
    return (<h2 style={{color:"red"}}>

        {DataLoader}
        
        </h2>)   
}
}

export async function Loader({request}){

    const url = new URL(request.url); // Parse the full URL
  const searchParams = url.searchParams; // Get the query params

  const clientSecret = searchParams.get("payment_intent_client_secret");

  if (clientSecret) {
    const stripe = await stripePromise;
    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    return paymentIntent.status
  }

  return "Payment failed,or not Processed,please go back to the main page";

}