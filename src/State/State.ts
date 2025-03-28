import { configureStore } from "@reduxjs/toolkit";
import ConterReducer from "./NumberOfElements/NumberOfElements.ts"
import ShowCartReducer from "./Cart/CartState.ts"
import CartItemsReducer from "./CartItems/CartItems.ts"

export const Store=configureStore(
    {

reducer:{

Counter:ConterReducer,
ShowCart:ShowCartReducer,
CartItems:CartItemsReducer
}
}
);

 