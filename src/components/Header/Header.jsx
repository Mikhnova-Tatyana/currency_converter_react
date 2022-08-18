import React from 'react';
import classes from './Header.module.scss'

  const Header = ({rateUSD, rateEUR}) => {
  return (
    <>
      <h2 className={classes.header}>
        {`Актуальный курс на ${new Date().toDateString()}`}  
      </h2>
      <p>EUR: {rateEUR}</p>
      <p>USD: {rateUSD}</p>
    </>
  )
}

export default Header;