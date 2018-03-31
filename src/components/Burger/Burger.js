import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedIngrediants = Object.keys(props.ingredients)
        .map(igKey => {
          return[...Array(props.ingredients[igKey])].map( (_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>;
          } );
        } )
        .reduce((arr,el) => {
          return arr.concat(el);
        }, []);
    if (transformedIngrediants.length === 0){
      transformedIngrediants = <p>Dodaj sastojke</p>;
    }
  return (
    <div className = {classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngrediants}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;
