// Cravely / Admin / src / components / Order / Order.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";
import API_ROUTES from "../../api/api_route";
import { toast } from "react-toastify";
import { FiBox, FiCheckCircle, FiClock, FiTruck, FiUser } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { useForm, useWatch } from "react-hook-form";
import { SelectInput } from "../FormInputs";

export const iconMap = {
  FiClock: <FiClock className="text-lg" />,
  FiTruck: <FiTruck className="text-lg" />,
  FiCheckCircle: <FiCheckCircle className="text-lg" />,
};

export const statusStyles = {
  processing: {
    color: "text-teal-400",
    bg: "bg-teal-900/20",
    icon: "FiClock",
    label: "Processing",
    hideLabel: false,
  },
  outForDelivery: {
    color: "text-blue-400",
    bg: "bg-blue-900/20",
    icon: "FiTruck",
    label: "Out for Delivery",
    hideLabel: false,
  },
  delivered: {
    color: "text-green-400",
    bg: "bg-green-900/20",
    icon: "FiCheckCircle",
    label: "Delivered",
    hideLabel: false,
  },
  succeeded: {
    color: "text-green-400",
    bg: "bg-green-900/20",
    icon: "FiCheckCircle",
    label: "Completed",
    hideLabel: true,
  },
};

export const paymentMethodDetails = {
  cod: {
    label: "COD",
    class: "bg-yellow-600/30 text-yellow-300 border-yellow-500/50",
  },
  card: {
    label: "Credit/Debit Card",
    class: "bg-blue-600/30 text-blue-300 border-blue-500/50",
  },
  upi: {
    label: "UPI Payment",
    class: "bg-purple-600/30 text-purple-300 border-purple-500/50",
  },
  default: {
    label: "Online",
    class: "bg-green-600/30 text-green-400 border-green-500/50",
  },
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { control, setValue } = useForm();

  const statusOptions = Object.entries(statusStyles)
    .filter(([key]) => key !== "succeeded")
    .map(([key, sty]) => ({
      value: key,
      label: sty.label,
    }));

  useEffect(() => {
    orders.forEach((order) => {
      setValue(`status.${order._id}`, order.status);
    });
  }, [orders, setValue]);

  const watchedStatuses = useWatch({
    control,
    name: orders.map((o) => `status.${o._id}`),
  });

  useEffect(() => {
    watchedStatuses?.forEach((status, index) => {
      const order = orders[index];
      if (order && status && status !== order.status) {
        handleStatusChange(order._id, status);
      }
    });
  }, [watchedStatuses]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get(API_ROUTES.ORDER.ORDER_ADMIN_GET_ALL, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        console.log("Fetch Order API Response:", data.orders);

        const formatted = data.orders.map((order) => ({
          ...order,
          address: order.address ?? order.shippingAddress?.address ?? "",
          city: order.city ?? order.shippingAddress?.city ?? "",
          zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? "",
          phone: order.phone ?? "",
          items:
            order.items?.map((e) => ({
              _id: e._id,
              item: e.item,
              quantity: e.quantity,
            })) || [],
          createdAt: new Date(order.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        if (data.success) {
          console.log("Fetch Order Success:", data.message);

          setOrders(formatted);
          setError(null);
        } else {
          toast.warn(data.message);
          console.log("Fetch Order Data Error:", data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        console.log("Fetch Order Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await api.put(
        API_ROUTES.ORDER.ORDER_UPDATE_ADMIN_GET_ALL(orderId),
        { status: newStatus },
      );

      console.log("Change Order Status API Response:", data.updated);

      if (data.success) {
        toast.success(data.message);
        console.log("Change Order Status Success:", data.message);

        setOrders(
          orders.map((o) =>
            o._id === orderId ? { ...o, status: newStatus } : o,
          ),
        );
        setError(null);
      } else {
        toast.warn(data.message);
        console.log("Change Order Status Data Error:", data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      console.log("Change Order Status Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-linear-to-br from-[#111827] via-[#1F2937] to-[#293548] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <ClipLoader size={40} color="#0D9488" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-linear-to-br from-[#111827] via-[#1F2937] to-[#293548] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#111827] via-[#1F2937] to-[#293548] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="bg-[#3F3F46]/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-teal-500/20">
          <h2 className="text-3xl font-bold mb-8 bg-linear-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent text-center">
            Order Management
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2C2F3F]/50">
                <tr>
                  {[
                    "Order ID",
                    "Customer",
                    "Address",
                    "Items",
                    "Total Items",
                    "Price",
                    "Payment",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className={`p-4 text-teal-400 ${h === "Total Items" ? "text-center" : "text-left"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const totalItems = order.items.reduce(
                    (s, i) => s + i.quantity,
                    0,
                  );

                  // const totalPrice =
                  //   order.total ??
                  //   order.items.reduce((s, i) => s + i.item.price * i.quantity);

                  const totalPrice =
                    typeof order.total === "number"
                      ? order.total
                      : order.items.reduce(
                          (s, i) =>
                            s + Number(i.item.price) * Number(i.quantity),
                          0,
                        );

                  // const payMethod = paymentMethodDetails[order.payMethod?.toLowerCase()] || paymentMethodDetails;
                  const payMethod =
                    paymentMethodDetails[order.paymentMethod?.toLowerCase()] ||
                    paymentMethodDetails.default;

                  const payStatusStyle =
                    statusStyles[order.paymentStatus] ||
                    statusStyles.processing;

                  const stat =
                    statusStyles[order.status] || statusStyles.processing;

                  return (
                    <tr
                      key={order._id}
                      className="border-b border-teal-500/20 hover:bg-[#2C2F3F]/30 transition-colors group"
                    >
                      <td className="p-4 font-mono text-sm text-teal-100">
                        #{order._id.slice(-8)}
                      </td>

                      <td className="p-4">
                        <div className=" flex items-center gap-2">
                          <FiUser className="text-teal-400" />
                          <div>
                            <p className=" text-teal-100">
                              {order.user?.name ||
                                order.firstName + " " + order.lastName}
                            </p>

                            <p className="text-sm text-teal-400/60">
                              {order.user?.phone || order.phone}
                            </p>

                            <p className="text-sm text-teal-400/60">
                              {order.user?.email || order.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="text-teal-100/80 text-sm max-w-50">
                          {order.address}, {order.city} - {order.zipCode}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className=" space-y-1 max-h-52 overflow-auto">
                          {order.items.map((itm, idx) => (
                            <div
                              key={idx}
                              className=" flex items-center gap-3 p-2 rounded-lg"
                            >
                              <img
                                src={itm.item.imageUrl}
                                alt={itm.item.name}
                                className=" w-10 h-10 object-cover rounded-lg"
                              />

                              <div className="flex-1">
                                <span className="text-teal-100/80 text-sm block truncate">
                                  {itm.item.name}
                                </span>

                                <div className="flex items-center gap-2 text-xs text-teal-400/60">
                                  <span>${itm.item.price.toFixed(2)}</span>
                                  <span>·</span>
                                  <span>x{itm.quantity}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center gap-1">
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
                            className={`${payMethod.class} px-3 py-1.5 rounded-lg border text-sm`}
                          >
                            {payMethod.label}
                          </div>

                          <div
                            className={`${payStatusStyle.color} flex items-center gap-2 text-sm`}
                          >
                            {iconMap[payStatusStyle.icon]}

                            <span>{payStatusStyle.label}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`${stat.color} text-xl`}>
                            {iconMap[stat.icon]}
                          </span>

                          {/* <select
                            value={order.value}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            className={`px-4 py-2 rounded-lg ${stat.bg} ${stat.color} border border-teal-500/20 text-sm cursor-pointer`}
                          >
                            {Object.entries(statusStyles)
                              .filter(([k]) => k !== "succeeded")
                              .map(([key, sty]) => (
                                <option
                                  value={key}
                                  key={key}
                                  className={`${sty.bg} ${sty.color}`}
                                >
                                  {sty.label}
                                </option>
                              ))}
                          </select> */}

                          <SelectInput
                            name={`status.${order._id}`}
                            control={control}
                            options={statusOptions}
                            className="min-w-45"
                            errors={null}
                          />
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

export default Order;
