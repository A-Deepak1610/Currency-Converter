import React, { useEffect, useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Amount from "../store/Store";
import "../styles/CurrencyConverter.css"
export default function Countries() {
  const currencyCodes = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "FOK",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KID",
    "KMF",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLE",
    "SLL",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TVD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "UYU",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "YER",
    "ZAR",
    "ZMW",
    "ZWL",
];
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("INR");
  useEffect(() =>{
    convert();
  }, [currency1,currency2]);
  const {amount,inputamount,changeCountry1,changeCountry2,getbase}=Amount(); //Zusatnd
  function convert(){
    changeCountry1(currency1)
    changeCountry2(currency2)
    // Changebaserate()         TEMP OFF
  }
  // Change Base Rate
  async function Changebaserate() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;
    try {
        const response = await fetch(API_URL); // Await fetch
        const data = await response.json(); // Await response.json()
        if (data.rates && data.rates[currency2] && data.rates[currency1]) {
            console.log(data);
            const exchangeRate = data.rates[currency2] / data.rates[currency1];
            const baserate=exchangeRate.toFixed(2)
            getbase(`1 ${currency1} = ${baserate} ${currency2} (today)`)
        } else {
            console.error("Conversion rate not available");
        }
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
    }
}
  function Swap(){
    const temp=currency1
    setCurrency1(currency2)
    setCurrency2(temp)
  }
  return (
    <>
      <div className="countries">
        <div className="from">
          <FormControl fullWidth>
            <Select
              sx={{
                border:"2px solid gray ",
                backgroundColor:"white",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center", 
                },
                "&.MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
              }}
              value={currency1}
              onChange={(e) => {setCurrency1(e.target.value);}}>
              {currencyCodes.map((code) => (
                <MenuItem
                  key={code}
                  value={code}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", 
                  }}
                >
                  <img
                    src={`https://flagsapi.com/${code.substring(
                      0,
                      2
                    )}/flat/64.png`}
                    alt={code}
                    style={{ width: "24px", marginRight: "8px" }}
                  />
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <svg width="20" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg" className="path" onClick={Swap}>
            <path
              d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
              fill="#4459fb"
            />
        </svg>

        <div className="to">
          <FormControl fullWidth>
          <Select
              sx={{
                border:"2px solid gray ",
                display: "flex",
                alignItems: "center", 
                textAlign: "center",
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center", 
                },
                "&.MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
              }}
              value={currency2}
              onChange={(e) => setCurrency2(e.target.value)}
            >
              {currencyCodes.map((code) => (
                <MenuItem
                  key={code}
                  value={code}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`https://flagsapi.com/${code.substring(
                      0,
                      2
                    )}/flat/64.png`}
                    alt={code}
                    style={{ width: "24px", marginRight: "8px" }}
                  />
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}
