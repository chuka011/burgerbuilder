import React from 'react';
import Aux from '../../../hoc/Auxw';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey =>{
      return(
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
        </li>);
    });

  return (
    <Aux>
      <h3>Narucili ste</h3>
      <p>Ukusni burger sa sledecim sastojcima:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Nastavite sa narucivanjem</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>ODUSTANI</Button>
      <Button btnType="Success" clicked={props.purchaceContinued}>NASTAVI</Button>
    </Aux>
  )
};

export default orderSummary;
