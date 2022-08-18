import './App.scss';
import {React, useCallback, useEffect, useState} from 'react';
import Header from './components/Header/Header';
import CurrencyField from './components/CurrencyField/CurrencyField';

const APP_URL = "https://open.er-api.com/v6/latest";

function App() {

  const [currancyTypes, setCurrancyTypes] = useState([]);
  const [currancyFrom, setCurrancyFrom] = useState('');
  const [currancyTo, setCurrancyTo] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [quantityFromCurrancy, setQuantityFromCurrancy] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [rateUSD, setRateUSD] = useState();
  const [rateEUR, setRateEUR] = useState();

  useEffect( () => {
    if (currancyFrom !== null && currancyTo !== null) {
      fetch(`${APP_URL}?base=${currancyFrom}&symbols=${currancyTo}`)
        .then(response => response.json())
        .then(data => setExchangeRate(data.rates[currancyTo]))   
    }
  }, [currancyFrom, currancyTo])

  useEffect( () => {
    fetchData();
  }, [])

  async function fetchData() {
    const response = await fetch(APP_URL);
    const data = await response.json();
    setCurrancyTypes([...Object.keys(data.rates)]);
    setCurrancyFrom(Object.keys(data.rates)[145]);
    setCurrancyTo(Object.keys(data.rates)[0]);
    let currentRateUSD = data.rates[Object.keys(data.rates)[0]];
    let currentRateEUR = data.rates[Object.keys(data.rates)[43]];
    let currentRateUAH = data.rates[Object.keys(data.rates)[145]];
    setExchangeRate((currentRateUSD / currentRateUAH).toFixed(4));
    setRateUSD((currentRateUAH / currentRateUSD).toFixed(4));
    setRateEUR((currentRateUAH / currentRateEUR).toFixed(4));
  }

  const currancyFromHandler = useCallback((e) => setCurrancyFrom(e.target.value), [])
  const currancyToHandler = useCallback((e) => setCurrancyTo(e.target.value), [])

  let toQuantity, fromQuantity;
    if (quantityFromCurrancy) {
      fromQuantity = quantity;
      toQuantity = (quantity * exchangeRate).toFixed(4);
    } else {
      toQuantity = quantity;
      fromQuantity = (quantity / exchangeRate).toFixed(4);
    }
  
  const handleFromQuantityChange = (e) => {
    setQuantity(e.target.value);
    setQuantityFromCurrancy(true);
  }
  const handleToQuantityChange = (e) => {
    setQuantity(e.target.value);
    setQuantityFromCurrancy(false);
  }

  return (
    <div className="App">
      <Header rateUSD={rateUSD} rateEUR={rateEUR} />
      <CurrencyField 
        currancyTypes={currancyTypes}
        selectedCurrancy={currancyFrom} 
        onChangeCurrancy={currancyFromHandler}
        quantity={fromQuantity}
        onChangeQuantity={handleFromQuantityChange}
      />
      <span className="equals">=</span>
      <CurrencyField 
        currancyTypes={currancyTypes} 
        selectedCurrancy={currancyTo} 
        onChangeCurrancy={currancyToHandler}
        quantity={toQuantity}
        onChangeQuantity={handleToQuantityChange}
      />
    </div>
  );
}

export default App;