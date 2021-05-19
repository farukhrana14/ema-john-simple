import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";
// import SplitForm from "./SplitForm";


const stripePromise = loadStripe(
  "pk_test_51Ie1EyKlUpwuQ4YkZUFJpIMrHNjaScQ0n45xgIZLi5qmuaEHjmkzpFihp5Ka8rIfeOOKK9aN1YhkJ6TKAIb3bKNQ00EsAKprFM"
);

const processPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment} />
    </Elements>
  );
};

export default processPayment;
