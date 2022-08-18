import React, {useMemo} from 'react';
import classes from './CurrencyField.module.scss'

const CurrencyField = (props) => {
  const { 
    currancyTypes, 
    selectedCurrancy, 
    onChangeCurrancy, 
    quantity, 
    onChangeQuantity 
  } = props;
  
  let options = useMemo(() => {
    return currancyTypes.map(option => 
      <option key={option} value={option}>{option}</option>
    )
  }, [currancyTypes])
  
  return (
    <div className={classes.wrapper}>
      <input 
        type="number" 
        value={quantity} 
        onChange={onChangeQuantity}
      />
      <select 
        value={selectedCurrancy}
        onChange={onChangeCurrancy}
        >
        { options }
      </select>
    </div>
  )
}

export default CurrencyField;