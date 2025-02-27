import React, { useEffect, useState } from "react";
import "../styles/CurrencyConverter.css";
import { useNavigate } from "react-router-dom";
import Amount from "../store/Store";
import {XAxis, YAxis,AreaChart,Area, Tooltip, ResponsiveContainer,} from "recharts";
import Countries from "../components/Countries";
export default function CurrencyConverter() {
  const { user, setUser, admin, setAdmin } = Amount();
  const navigate = useNavigate();
  // Sign Out
  function handleSignout() {
    navigate("/");
    setUser(false);
    setAdmin(false);
  }
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <p>{`${payload[0].payload.name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  // Last Ten Days
  const getLastTenDays = () => {
    const dates = [];
    for (let i = 9; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      dates.push(formattedDate);
    }
    return dates;
  };
  const lastTenDays = getLastTenDays();
  const { country1, country2, base } = Amount();
  const [inamount, setInamount] = useState();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  function getLast10Days() {
    return [...Array(10)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    });
  }
  const API_KEY = import.meta.env.VITE_API_KEY;
  // Last Ten Days Rates
  async function fetchLast10DaysRates() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const last10Days = getLast10Days();
    const exchangeRates = [];
    setLoadinggraph(true);
    for (const date of last10Days){
      try {
        const API_URL = `https://api.exchangeratesapi.io/v1/${date}?access_key=${API_KEY}`;
        const response = await fetch(API_URL);
        const data = await response.json();

        if (
          data.success &&
          data.rates &&
          data.rates[country2] &&
          data.rates[country1]
        ) {
          const rate = data.rates[country2] / data.rates[country1];

          if (!isNaN(rate)) {
            exchangeRates.push(parseFloat(rate.toFixed(2)));
          } else {
            console.error(`Invalid rate for ${date}`);
            exchangeRates.push(null);
          }
        } else {
          console.error(`Error fetching data for ${date}:`, data.error);
          exchangeRates.push(null);
        }
      } catch (error) {
        console.error(`Fetch error for ${date}:`, error);
        exchangeRates.push(null);
      } finally {
        setLoadinggraph(false);
      }
    }
    console.log("Last 10 days exchange rates:", exchangeRates);
    return exchangeRates; 
  }
  const [last10DaysRates, setLast10DaysRates] = useState([]);
  // Load Rates
  async function loadRates() {
    const rates = await fetchLast10DaysRates(country1, country2);
    setLast10DaysRates(rates);
    console.log(last10DaysRates);
  }
  // useEffect(() =>{loadRates();}, [country1,country2]);  TEMP OFF
  const data = [
    {
      name: lastTenDays[0],
      pv: last10DaysRates[9],
    },
    {
      name: lastTenDays[1],
      pv: last10DaysRates[8],
    },
    {
      name: lastTenDays[2],
      pv: last10DaysRates[7],
    },
    {
      name: lastTenDays[3],
      pv: last10DaysRates[6],
    },
    {
      name: lastTenDays[4],
      pv: last10DaysRates[5],
    },
    {
      name: lastTenDays[5],
      pv: last10DaysRates[4],
    },
    {
      name: lastTenDays[6],
      pv: last10DaysRates[3],
    },
    {
      name: lastTenDays[7],
      pv: last10DaysRates[2],
    },
    {
      name: lastTenDays[8],
      pv: last10DaysRates[1],
    },
    {
      name: lastTenDays[9],
      pv: last10DaysRates[0],
    },
  ];

  //Converting Currency
  const [result_amt, setResult_amt] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const API_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.rates && data.rates[country2] && data.rates[country1]){
        console.log(data);
        const exchangeRate = data.rates[country2] / data.rates[country1];
        const convertedAmount = (inamount * exchangeRate).toFixed(2);
        setResult_amt(convertedAmount);
        setResult(`${inamount} ${country1} = ${convertedAmount} ${country2}`);
      } else {
        console.error("Conversion rate not available");
        setResult("Conversion rate not available");
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      setResult("Error fetching exchange rates");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (result_amt !== null) {
      addData();
    }
  }, [result_amt]);
  // Add data to Db
  const addData = async () => {
    console.log(country1, country2, inamount, result_amt);
    try {
      const res = await fetch("http://localhost:7000/add-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          c1: country1,
          c2: country2,
          inamt: inamount,
          r: result_amt,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error("HTTP Error");
      }
      console.log("Added succesfully");
      setInamount("");
    } catch (error) {
      console.log(error);
    }
  };
  const [loadinggrpah, setLoadinggraph] = useState(false);
  return (
    <div className="main-container">
      <button className="loadgrpah" onClick={loadRates}>
        Generate Graph
      </button>
      <div className="navbar">
        <h1>Currency Converter</h1>
        <button className="signout" onClick={handleSignout}>
          <i className="fa-solid fa-right-from-bracket"></i>Signout
        </button>
      </div>
      <div className="heading">Check live foreign currency exchange rates</div>
      <div className="graphs-cointaner">
        <div className="graphs">
          <p className="basecurrency">{base}</p>
          <p className="loadinggraph">
            {loadinggrpah ? <span>Generating Graph ...</span> : ""}
          </p>
          <ResponsiveContainer width="100%" height="100%" className="ResponsiveContainer">
            <AreaChart
              width={500}
              height={250}
              data={data}
              margin={{
                top: 5,
                right:30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64b5f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#64b5f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} /> {/* Custom Tooltip */}
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="converter">
        <div className="converstion-cointainer">
          <h4>Enter The Amount</h4>
          <form action="" onSubmit={handleSubmit}>
            <div className="form">
              <input
                type="number"
                className="input-amount"
                placeholder="Enter the amount"
                min="1"
                required
                value={inamount}
                onChange={(e) => setInamount(e.target.value)}
              />
              <button type="sumbit" className="convertbtn">
                Convert
              </button>
            </div>
          </form>
          <Countries />
          {/* <h2 className="result">{result}</h2> */}
          <h2 className="result">
            {loading ? (
              <span className="fetching">
                Fetching latest exchange rates...
              </span>
            ) : (
              result
            )}
          </h2>
        </div>
      </div>
    </div>
  );
}
