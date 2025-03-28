


import { createSlice } from "@reduxjs/toolkit";

interface ShowCartState{
    value:boolean,
}

const  initialState:ShowCartState={
    value:false,
}

const ShowCartSlice=createSlice({
    
        name:"ShowCart",
        initialState
            ,
        reducers:{

            SetTofalse(state){
                state.value=false;
            } 
,
            SetToTrue(state){
                state.value=true;
            }



        },

    
})

export default ShowCartSlice.reducer;

export const {SetToTrue,SetTofalse} =ShowCartSlice.actions;


