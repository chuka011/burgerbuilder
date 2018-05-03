import * as actionTypes from '../actions/actionTypes';
import { updateObject} from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const addIngredient = (state, action) => {
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
          ingredients: updatedIngredients,
          totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  }
  return updateObject(state, updatedState);
};

const removeIngredient = (action, state) => {
  const updatedIngr = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
  const updatedIng = updateObject(state.ingredients, updatedIngr);
  const updatedSt = {
          ingredients: updatedIng,
          totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  }
  return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
  const updatedIng = updateObject(state.ingredients, {ingredients: action.ingredients});
  const updatedSt = {
    ingredients: updatedIng,
    totalPrice: 4,
    error: false
  };
  return updateObject(state, updatedSt);
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(action, state);
    case actionTypes.SET_INGREDIENT: return setIngredients(action, state);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {error: true});
    default: return state;
  }

}

export default reducer;
