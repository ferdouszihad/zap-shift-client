import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useParams } from "react-router";
import useUserParcel from "../../../../hooks/useUserParcel";
import Logo from "../../../../components/Logo";

const CheckOut = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //   const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const { parcels } = useUserParcel();

  const { to } = useParams();

  useEffect(() => {
    if (to == "all") {
      const unpaidParcels = parcels.filter(
        (parcel) => parcel.status == "unpaid"
      );
      setTotal(unpaidParcels.reduce((ac, parcel) => parcel.charge + ac, 0));
    } else {
      const parcel = parcels.find((p) => p._id == to);
      if (!parcel) {
        Swal.fire("Opps", "System Could not recognize your parcel", "error");
      } else {
        setTotal(parcel.charge);
      }
    }
  }, [to, parcels]);

  useEffect(() => {
    if (total > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: total })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, total]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);

      setTransactionId(paymentIntent.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex-1">
        <h2 className="text-xl font-bold text-secondary">
          Total to Pay {total} ৳
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex-1  border p-8 border-base-300 rounded-xl shadow-lg bg-[url('/be-amerchant-bg.png')] bg-stone-100  bg-cover text-light mx-auto lg:mx-0"
      >
        <div className="mb-10 flex justify-between items-center ">
          <div className="font-bold text-secondary">
            ZapShipt Virtual Payment{" "}
          </div>
          <Logo></Logo>
        </div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          className="btn btn-sm btn-primary text-black my-4 mt-6"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay {total} ৳ Now
        </button>

        <div className="flex flex-wrap justify-end *:w-8">
          <img
            src="https://img.icons8.com/?size=96&id=13608&format=png"
            alt=""
          />
          <img
            src="https://img.icons8.com/?size=96&id=13610&format=png"
            alt=""
          />
          <img
            src="https://img.icons8.com/?size=160&id=HNTWDEyM2bxs&format=png"
            alt=""
          />
        </div>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">
            {" "}
            Your transaction id: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckOut;
