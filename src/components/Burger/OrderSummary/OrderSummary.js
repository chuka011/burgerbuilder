import React, {Component} from 'react';
import Aux from '../../../hoc/Auxw/Auxw';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  render () {
      const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
          return(
            <li key={igKey}>
              <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
            </li>);
        });

      return (
        <Aux>
          <h3>Narucili ste</h3>
          <p>Ukusni burger sa sledecim sastojcima:</p>
          <ul>
            {ingredientSummary}
          </ul>
          <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
          <p>Nastavite sa narucivanjem</p>
          <Button btnType="Danger" clicked={this.props.purchaseCancelled}>ODUSTANI</Button>
          <Button btnType="Success" clicked={this.props.purchaceContinued}>NASTAVI</Button>
        </Aux>
      );
  }
}

export default OrderSummary;
