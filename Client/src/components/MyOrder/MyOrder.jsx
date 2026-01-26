// Cravely / Client / src / components / MyOrder / MyOrder.jsx
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiTruck,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import API_ROUTES from "../../api/api_route";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../utils/toast";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASEURL;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(API_ROUTES.ORDER.ORDER_GET, {
          params: { email: user?.email },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        const data = response.data;

        console.log("Fetch Orders API Response:", data);

        if (data.success) {
          const formattedOrders = data.orders.map((order) => ({
            ...order,
            items:
              order.items?.map((entry) => ({
                _id: entry._id,
                item: {
                  ...entry.item,
                  imageUrl: entry.item.imageUrl,
                },
                quantity: entry.quantity,
              })) || [],
            createdAt: new Date(order.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            paymentStatus: order.paymentStatus?.toLowerCase() || "pending",
          }));

          setOrders(formattedOrders);
          setError(null);

          showSuccessToast(data.message);
          console.log("Fetch Orders Success:", data.message);
        } else {
          showWarningToast(data.message);
          console.log("Fetch Orders Data Error:", data.message);
        }
      } catch (error) {
        showErrorToast(error?.response?.data?.message || error?.message);
        console.log("Fetch Order Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const statusStyles = {
    processing: {
      color: "text-teal-400",
      bg: "bg-teal-900/20",
      icon: <FiClock className="text-lg" />,
      label: "Processing",
    },
    outForDelivery: {
      color: "text-sky-400",
      bg: "bg-sky-900/20",
      icon: <FiTruck className="text-lg" />,
      label: "Out for Delivery",
    },
    delivered: {
      color: "text-emerald-400",
      bg: "bg-emerald-900/20",
      icon: <FiCheckCircle className="text-lg" />,
      label: "Delivered",
    },
    pending: {
      color: "text-lime-400",
      bg: "bg-lime-900/20",
      icon: <FiClock className="text-lg" />,
      label: "Payment Pending",
    },
    succeeded: {
      color: "text-emerald-400",
      bg: "bg-emerald-900/20",
      icon: <FiCheckCircle className="text-lg" />,
      label: "Completed",
    },
  };

  const getPaymentMethodDetails = (method) => {
    switch (method.toLowerCase()) {
      case "cod":
        return {
          label: "COD",
          class: "bg-lime-600/30 text-lime-300 border-lime-500/50",
        };

      case "card":
        return {
          label: "Credit/Debit Card",
          class: "bg-sky-600/30 text-sky-300 border-sky-500/50",
        };

      case "upi":
        return {
          label: "UPI Payment",
          class: "bg-purple-600/30 text-purple-300 border-purple-500/50",
        };

      default:
        return {
          label: "Online",
          class: "bg-emerald-600/30 text-emerald-300 border-emerald-500/50",
        };
    }
  };

  if (error)
    return (
      <div className="min-h-screen bg-linear-to-br from-[#111827] via-[#1F2937] to-[#293548] flex items-centet justify-center text-state-500">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 text-teal-400 hover:text-teal-300"
        >
          <FiArrowLeft className="text-xl" />
          <span>Try Again</span>
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#111827] via-[#1F2937] to-[#293548] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-teal-400 hover:text-teal-300"
          >
            <FiArrowLeft className="text-xl" />
            <span className="font-bold">Back to Home</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-teal-400/70 text-sm">{user?.email}</span>
          </div>
        </div>

        <div className="bg-[#3F3F46]/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-teal-500/20">
          <h2 className="text-3xl font-bold mb-8 bg-linear-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent text-center">
            Order History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2C2F3F]/50">
                <tr>
                  <th className="p-4 text-left text-teal-400">Order ID</th>
                  <th className="p-4 text-left text-teal-400">Customer</th>
                  <th className="p-4 text-left text-teal-400">Address</th>
                  <th className="p-4 text-left text-teal-400">Items</th>
                  <th className="p-4 text-left text-teal-400">Total Items</th>
                  <th className="p-4 text-left text-teal-400">Price</th>
                  <th className="p-4 text-left text-teal-400">Payment</th>
                  <th className="p-4 text-left text-teal-400">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  // const totalItems = order.item.reduce(
                  //   (sum, item) => sum + item.quantity,
                  //   0,
                  // );

                  const totalItems = order.items.reduce(
                    (sum, item) => sum + item.quantity,
                    0,
                  );

                  // const totalPrice =
                  //   order.total ??
                  //   order.items.reduce(
                  //     (sum, item) => sum + item.item.price * item.quantity,
                  //     0,
                  //   );

                  const totalPrice =
                    order.total ??
                    order.items.reduce(
                      (sum, item) => sum + item.item.price * item.quantity,
                      0,
                    );

                  const paymentMethod = getPaymentMethodDetails(
                    order.paymentMethod,
                  );

                  const status =
                    statusStyles[order.status] || statusStyles.processing;

                  const paymentStatus =
                    statusStyles[order.paymentStatus] || statusStyles.pending;

                  return (
                    <tr
                      key={order._id}
                      className="border-b border-teal-500/20 hover:bg-[#2C2F3F]/30 transition-colors group"
                    >
                      <td className="p-4 text-teal-100 font-mono text-sm">
                        #{order._id?.slice(-8)}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiUser className="text-teal-400" />
                          <div>
                            <p className="text-teal-100">
                              {order.firstName} {order.lastName}
                            </p>

                            <p className="text-sm text-teal-400/60">
                              {order.phone}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-teal-400" />
                          <div className="text-teal-100/80 text-sm max-w-50">
                            {order.address}, {order.city} - {order.zipCode}
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-2">
                          {order?.items.map((item, index) => (
                            <div
                              key={`${order._id}-${index}`}
                              className="flex items-center gap-3 p-2 bg-[#2C2F3F]/50 rounded-lg"
                            >
                              <img
                                src={`${BASE_URL}${item.item.imageUrl}`}
                                alt={item.item.name}
                                className="w-10 h-10 object-cover rounded-lg"
                              />

                              <div className="flex-1">
                                <span className="text-teal-100/80 text-sm block">
                                  {item.item.name}
                                </span>

                                <div className="flex items-center gap-2 text-xs text-teal-400/60">
                                  <span>${item.item.price}</span>
                                  <span className="mx-1">•</span>
                                  <span>X{item.quantity}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FiBox className="text-teal-400" />
                          <span className="text-teal-300 text-lg">
                            {totalItems}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-teal-300 text-lg">
                        ${totalPrice.toFixed(2)}
                      </td>

                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <div
                            className={`${paymentMethod.class} px-3 py-1.5 rounded-lg border text-sm`}
                          >
                            {paymentMethod.label}
                          </div>

                          <div
                            className={`${paymentStatus.color} px-3 py-1.5 rounded-lg text-sm`}
                          >
                            {paymentStatus.icon}{" "}
                            <span>{paymentStatus.label}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`${status.color} text-xl`}>
                            {status.icon}
                          </span>

                          <span
                            className={`px-4 py-2 rounded-lg ${status.bg} ${status.color} border border-teal-500/20 text-sm`}
                          >
                            {status.label}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12 text-teal-100/60 text-xl">
              No Orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
