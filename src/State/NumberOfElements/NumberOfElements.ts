
import { createSlice } from "@reduxjs/toolkit";

interface CounterState{
    value:number,
}

const  initialState:CounterState={
    value:0,
}

const CounterSlice=createSlice({
    
        name:"Counter",
        initialState
            ,
        reducers:{

            Increment(state){
                state.value+=1;
            } 
,
            Decrement(state){
                state.value-=1;
            }



        },

    
})

export default CounterSlice.reducer;

export const {Increment,Decrement} =CounterSlice.actions;


