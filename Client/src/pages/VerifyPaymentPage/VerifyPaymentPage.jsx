// Cravely / Client / src / pages / VerifyPaymentPage / VerifyPaymentPage.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext/CartContext";
import api from "../../api/axios";
import API_ROUTES from "../../api/api_route";

const VerifyPaymentPage = () => {
  const { clearCart } = useCart();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [statusMsg, setStatusMsg] = useState("Verfying Payment..");

  const token = localStorage.getItem("authToken");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get("payment_status");
    const session_id = params.get("session_id");

    if (success == "true" || !session_id) {
      if (success === "false") {
        navigate("/checkout", { replace: true });
        return;
      }
      setStatusMsg("Payment failed but order placed for completion");
      return;
    }

    api
      .get(API_ROUTES.ORDER.ORDER_CONFIRM_PAYMENT, {
        params: { session_id },
        headers: authHeaders,
      })
      .then(() => {
        clearCart();
        navigate("/myorder", { replace: true });
      })
      .catch((error) => {
        console.error("confirmation error:", error);
        setStatusMsg("There was an error");
        clearCart(false);
      });
  }, [search, clearCart, navigate, authHeaders]);

  return (
    <div className="min-h-scre4 flex items-center justify-center text-white">
      <p>{statusMsg}</p>
    </div>
  );
};

export default VerifyPaymentPage;
