import { create } from "zustand";
import {persist} from 'zustand/middleware';
const Amount = create(persist((set) => ({
    amount:null,
    country1:"USA",
    country2:"INR",
    base:null,
    user:false,
    admin:false,
    inputamount:(amt)=>set({amount:amt}),
    changeCountry1:(country)=>set({country1:country}),
    changeCountry2:(country)=>set({country2:country}),
    getbase:(rate)=>set({base:rate}),
    setUser:(a)=>set({user:a}),
    setAdmin:(b)=>set({admin:b}),
}),
{name:"login_storage"},
));
export default Amount;