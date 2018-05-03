import React, {Component} from 'react';
import {connect} from 'react-redux'

import Aux from  '../../hoc/Auxw/Auxw';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasing: false

  }

  componentDidMount (){
      this.props.onInitIngredients();
  }

  updatePurchaseState (ingrediants) {
    console.log(ingrediants);
    const sum = Object.keys(ingrediants)
      .map(igKey => {
        return ingrediants[igKey]
      })
      .reduce((sum,el) => {
        return sum + el;
      },0);
      console.log(sum);
      return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing:true});
  }


  purchaceCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaceContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push( '/checkout');
  }


  render () {
    const disabledInfo = {...this.props.ings};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0;
    };
    let orderSummary = null;


    let burger = this.props.error ? <p> Ingredients cant be loaded</p> : <Spinner />;
  if(this.props.ings) {
      orderSummary = <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaceCancelHandler}
          purchaceContinued={this.purchaceContinueHandler}/>;

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price} />
          </Aux>
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaceCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
}
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));
