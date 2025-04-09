
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 export class clsCartItem {
    ProductID: number;
    Name: string;
    NumberOfItems: number;
    Price :number;
    Image:any;

     constructor(productID: number, name: string, Price: number, NumberOfItems:number, Image: any) {
        
        this.ProductID=productID;
        this.Name=name;
        this.Price=Price;
        this.Image=Image;
        this.NumberOfItems=NumberOfItems;

    }

 

    // Method to display the values


    // Method to update the details
    }
    
interface CartItemsState{
     value: clsCartItem[] ;
}

const  initialState:CartItemsState={
    value:[],
}

const CartItemsSlice=createSlice({
    
        name:"CartItems",
        initialState
            ,
        reducers:{

            AddItem(state,action:PayloadAction<clsCartItem>){

                state.value.push(action.payload);
             
            } 
,         DeleteItem: (state , action:PayloadAction<number>)=>{
                state.value=state.value.filter(e=>e.ProductID!==action.payload)
            },

            IncriceNumberOfItems: (state , action:PayloadAction<number>)=>{

                state.value.forEach(e=>{
                 

                   if(e.ProductID===action.payload){

                    e.NumberOfItems++;
                    return;
                   } 

                 })

            },

          
            DecrceNumberOfItems: (state , action:PayloadAction<number>)=>{

                state.value.forEach(e=>{
                   
                    if(e.ProductID===action.payload){
                   if(e.NumberOfItems>1) {
                    
                    e.NumberOfItems--;


                   }
                     return;
                    } 
 
                  })
            },

          
    
    
  
        },

    
})

export default CartItemsSlice.reducer;

export const {AddItem,DeleteItem,IncriceNumberOfItems,DecrceNumberOfItems} =CartItemsSlice.actions;


