import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import StripeProvider from "../../context/StripeProvider";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";

const MakePayment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/agreements?email=${user.email}`)
        .then(res => {
          const data = Array.isArray(res.data) ? res.data[0] : res.data;
          setAgreement(data);
          setFinalAmount(Number(data?.rent || 0)); // base rent
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  const handleCouponApply = async () => {
    try {
      const res = await axios.get(`https://blockwise-server.vercel.app/api/coupons/${coupon.toUpperCase()}`);


      const couponData = res.data;
      if (couponData?.discount) {
        // const discountRate = couponData.discount;
        // const discounted = agreement.rent - (agreement.rent * discountRate / 100);
        const discountRate = Number(couponData.discount); // <-- convert to number
        const discounted = agreement.rent - (agreement.rent * discountRate / 100);
        setDiscount(discountRate);
        setFinalAmount(discounted.toFixed(2));
        setCouponError("");
      } else {
        setCouponError("Invalid coupon");
      }
    } catch {
      setCouponError("Invalid coupon");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!agreement) return <p>No agreement found.</p>;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Make Payment</h2>

      <div className="space-y-3 mb-6">
        <input type="text" readOnly value={agreement.email} className="input input-bordered w-full" />
        <input type="text" readOnly value={`Block: ${agreement.blockName}`} className="input input-bordered w-full" />
        <input type="text" readOnly value={`Floor: ${agreement.floorNo}`} className="input input-bordered w-full" />
        <input type="text" readOnly value={`Apartment: ${agreement.apartmentNo}`} className="input input-bordered w-full" />
        <input type="text" readOnly value={`Rent: ৳${agreement.rent}`} className="input input-bordered w-full" />

        {/* Month Selector */}
        <select value={month} onChange={(e) => setMonth(e.target.value)} className="select select-bordered w-full" required>
          <option value="">Select Month</option>
          {[
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {/* Coupon Field */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="input input-bordered w-full"
          />
          <button type="button" onClick={handleCouponApply} className="btn btn-secondary">Apply</button>
        </div>
        {discount > 0 && <p className="text-green-600">Coupon applied! {discount}% off</p>}
        {couponError && <p className="text-red-500">{couponError}</p>}

        <p className="font-semibold">Final Amount to Pay: ৳{finalAmount}</p>
      </div>

      {/* Stripe Checkout */}
      <StripeProvider>
        <CheckoutForm amount={parseFloat(finalAmount)} />
      </StripeProvider>
    </div>
  );
};

export default MakePayment;


