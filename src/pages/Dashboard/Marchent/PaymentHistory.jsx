import { formatDistanceToNow } from "date-fns";
import { FaMoneyCheckAlt } from "react-icons/fa";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../utils/Loading";
import usePayments from "../../../hooks/usePayments";

const PaymentHistory = () => {
  const { payments, isLoading } = usePayments();
  if (isLoading) return <Loading />;

  return (
    <div className="content-box pt-5">
      <PageTitle
        title="Payment History"
        subtitle="We secure Every payment into our Database"
      />

      <p className="border-l-4 border-secondary pl-4">
        Total <span className="font-bold">{payments.length}</span> Payments
        Found
      </p>

      <div className="overflow-x-auto pt-5 rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>
                <FaMoneyCheckAlt className="inline mr-1" />#
              </th>
              <th>Email</th>
              <th>Parcel ID</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Paid</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.user_email}</td>
                <td>{payment.parcelId}</td>
                <td>{payment.amount / 100}</td>
                <td className="uppercase">{payment.currency}</td>
                <td
                  title={new Date(payment.paid_at).toLocaleString()}
                  className="tooltip"
                >
                  {formatDistanceToNow(new Date(payment.paid_at), {
                    addSuffix: true,
                  })}
                </td>
                <td className="text-xs break-all">{payment.txn_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
