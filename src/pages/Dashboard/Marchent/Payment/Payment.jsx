import { loadStripe } from "@stripe/stripe-js";
import PageTitle from "../../../../components/PageTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_public_key);
const Payment = () => {
  console.log(stripePromise);
  return (
    <div className="container">
      <PageTitle
        title={"Payment"}
        subtitle={"please Pay to initiate the delivery process"}
      ></PageTitle>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOut></CheckOut>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
