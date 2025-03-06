import { configureStore } from "@reduxjs/toolkit";
import ConterReducer from "./NumberOfElements/NumberOfElements.ts"

export const Store=configureStore(
    {

reducer:{

Counter:ConterReducer

}
}
);

 