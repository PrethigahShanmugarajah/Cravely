// Cravely / Client / src / components / Checkout / Checkout.jsx
import { useEffect, useState } from "react";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input, SelectInput } from "../FormInputs";
import { useCart } from "../../CartContext/CartContext";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import API_ROUTES from "../../api/api_route";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../utils/toast";

const Checkout = () => {
  const { totalAmount, cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "",
  });
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem("authToken");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const confirmPayment = async () => {
      const params = new URLSearchParams(location.search);
      const paymentStatus = params.get("payment_status");
      const sessionId = params.get("session_id");

      if (!paymentStatus) return;

      console.log("Payment Status:", paymentStatus, "Session ID:", sessionId);
      setLoading(true);

      try {
        if (paymentStatus === "success" && sessionId) {
          const { data } = await api.get(
            API_ROUTES.ORDER.ORDER_CONFIRM_PAYMENT,
            {
              params: { sessionId },
              headers: authHeaders,
            },
          );

          console.log("Payment confirmation API response:", data);

          if (data.success && data.order) {
            console.log("Payment confirmed:", data.message);
            showSuccessToast(data.message);
            clearCart();
            navigate("/myorder", { state: { order: data.order } });
          } else {
            console.log("Payment confirmation warning:", data.message);
            showWarningToast(data.message);
          }
        } else if (paymentStatus === "cancel") {
          console.log("Payment cancelled by user");
          showWarningToast(
            "Payment was cancelled or failed. Please contact support",
          );
        }
      } catch (error) {
        console.error(
          "Payment confirmation error:",
          error?.response?.data?.message || error.message,
        );
        showErrorToast(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [location.search, clearCart, navigate, authHeaders]);

  const handleFormSubmit = async (formData) => {
    setLoading(true);

    const subtotal = Number(totalAmount.toFixed(2));
    const tax = Number((subtotal * 0.05).toFixed(2));
    const payload = {
      ...formData,
      subtotal,
      tax,
      total: Number((subtotal + tax).toFixed(2)),
      items: cartItems.map(({ item, quantity }) => ({
        name: item.name,
        price: item.price,
        quantity,
        imageUrl: item.imageUrl || "",
      })),
    };

    try {
      const { data } = await api.post(API_ROUTES.ORDER.ORDER_CREATE, payload, {
        headers: authHeaders,
      });

      console.log("Order API Response:", data);

      if (data.success && data.order) {
        showSuccessToast(data.message);
        console.log("Order Success:", data.message);

        if (formData.paymentMethod === "online") {
          window.location.href = data.checkoutUrl;
        } else {
          clearCart();
          navigate("/myorder", { state: { order: data.order } });
        }
      } else {
        showWarningToast(data.message);
        console.log("Order Data Error:", data.message);
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || error?.message);
      console.error("Order submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1C1B1F] to-[#252933] text-white py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <Link className="flex items-center gap-2 text-teal-400 mb-8" to="/cart">
          <FaArrowLeft /> Back to Cart
        </Link>

        <h1 className=" text-4xl font-bold text-center mb-8">Checkout</h1>
        <form
          className="grid lg:grid-cols-2 gap-12"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="bg-[#3F3F46]/80 p-6 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold">Personal Information</h2>

            <Input
              label="First Name"
              name="firstName"
              control={control}
              errors={errors}
              placeholder="First Name"
            />

            <Input
              label="Last Name"
              name="lastName"
              control={control}
              errors={errors}
              placeholder="Last Name"
            />

            <Input
              label="Phone"
              name="phone"
              type="number"
              control={control}
              errors={errors}
              placeholder="Phone"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              control={control}
              errors={errors}
              placeholder="Email"
            />

            <Input
              label="Address"
              name="address"
              control={control}
              errors={errors}
              placeholder="Address"
            />

            <Input
              label="City"
              name="city"
              control={control}
              errors={errors}
              placeholder="City"
            />

            <Input
              label="Zip Code"
              name="zipCode"
              control={control}
              errors={errors}
              placeholder="Zip Code"
            />
          </div>

          <div className="bg-[#3F3F46]/80 p-6 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold">Payment Details</h2>
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-teal-100">
                Your Order Items
              </h3>

              {cartItems.map(({ _id, item, quantity }) => (
                <div
                  key={_id}
                  className="flex justify-between items-center bg-[#2C2F3F] p-3 rounded-lg"
                >
                  <div className="flex-1">
                    <span className="text-teal-100">{item.name}</span>
                    <span className="ml-2 text-teal-500/80 text-sm">
                      X {quantity}
                    </span>
                  </div>

                  <span className="text-teal-300">
                    ${Number(item.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <PaymentSummary totalAmount={totalAmount} />

            <SelectInput
              label="Payment Method"
              name="paymentMethod"
              control={control}
              errors={errors}
              required
              options={[
                { value: "cod", label: "Cash On Delivery" },
                { value: "online", label: "Online Payment" },
              ]}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-slate-600 to-teal-600 py-4 rounded-xl font-bold flex justify-center items-center cursor-pointer"
            >
              <FaLock className="mr-20" />{" "}
              {loading ? "Processing..." : "Complete Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PaymentSummary = ({ totalAmount }) => {
  const subtotal = Number(totalAmount.toFixed(2));
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>$ {subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>Tax (5%)</span>
        <span>$ {tax.toFixed(2)}</span>
      </div>

      <div className="flex justify-between font-bold border-t pt-2">
        <span>Total (5%)</span>
        <span>$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Checkout;
