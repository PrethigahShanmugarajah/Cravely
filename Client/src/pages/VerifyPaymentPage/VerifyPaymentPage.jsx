import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext/CartContext";
import api from "../../api/axios";
import API_ROUTES from "../../api/api_route";
import { showErrorToast, showWarningToast } from "../../utils/toast";

const VerifyPaymentPage = () => {
  const { clearCart } = useCart();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [statusMsg, setStatusMsg] = useState("Verifying payment...");

  useEffect(() => {
    const confirmPayment = async () => {
      const params = new URLSearchParams(search);
      const success = params.get("success");
      const session_id = params.get("session_id");

      if (success === "false") {
        console.log("Payment cancelled by user");
        navigate("/checkout", { replace: true });
        return;
      }

      if (success !== "true" || !session_id) {
        console.log("Invalid payment params:", { success, session_id });
        setStatusMsg("Payment failed but order placed for completion");
        return;
      }

      const token = localStorage.getItem("authToken");

      try {
        console.log("Confirm Payment API Call Started");
        setStatusMsg("Verifying payment with server...");

        const { data } = await api.get(API_ROUTES.ORDER.ORDER_CONFIRM_PAYMENT, {
          params: { session_id },
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Confirm Payment API Response:", data);

        if (data?.success) {
          console.log("Payment Confirm Success:", data.message);
          clearCart();
          navigate("/myorder", { replace: true });
        } else {
          showWarningToast(data?.message);
          console.log("Payment Confirm Failed:", data?.message);
          setStatusMsg(data?.message || "Payment not completed");
        }
      } catch (error) {
        console.error(
          "Confirm Payment Error:",
          error?.response?.data?.message || error?.message,
        );
        showErrorToast(error?.response?.data?.message || error?.message);
        setStatusMsg("There was an error confirming payment");
      }
    };

    confirmPayment();
  }, [search, clearCart, navigate]);

  return (
    <div className="min-h-scre4 flex items-center justify-center text-white">
      <p>{statusMsg}</p>
    </div>
  );
};

export default VerifyPaymentPage;
