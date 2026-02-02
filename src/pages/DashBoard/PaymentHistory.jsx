import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/payments?email=${user.email}`)
        .then(res => setPayments(res.data));
    }
  }, [user?.email, axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200 text-sm text-left">
              <th>#</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, i) => (
              <tr key={payment._id}>
                <td>{i + 1}</td>
                <td>{new Date(payment.date).toLocaleString()}</td>
                <td>${Number(payment.amount).toFixed(2)}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No payment history found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;

