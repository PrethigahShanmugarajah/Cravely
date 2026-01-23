// Cravely / Server / controllers / orderController.js
import Stripe from "stripe";
import "dotenv/config";
import orderModel from "../models/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* -------- Order Create -------- */
export const orderCreate = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      city,
      zipCode,
      paymentMethod,
      subtotal,
      tax,
      total,
      items,
    } = req.body;

    // if (!items || !Array.isArray(items) || items.length === 0) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Items array is invalid or empty." });
    // }

    if (!items) {
      return res
        .status(400)
        .json({ success: false, message: "Items are required." });
    }

    if (!Array.isArray(items)) {
      return res
        .status(400)
        .json({ success: false, message: "Items must be an array." });
    }

    if (items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Items array cannot be empty." });
    }

    if (!["online", "cod"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }

    if (typeof subtotal !== "number") {
      return res.status(400).json({
        success: false,
        message: "Subtotal must be a number.",
      });
    }

    if (typeof tax !== "number") {
      return res.status(400).json({
        success: false,
        message: "Tax must be a number.",
      });
    }

    if (typeof total !== "number") {
      return res.status(400).json({
        success: false,
        message: "Total must be a number.",
      });
    }

    const orderItems = items.map(
      ({ item, name, price, imageUrl, quantity }) => {
        const base = item || {};
        return {
          item: {
            name: base.name || name || "Unknown",
            price: Number(base.price ?? price) || 0,
            imageUrl: base.imageUrl || imageUrl || "",
          },
          quantity: Number(quantity) || 0,
        };
      },
    );

    const shippingCost = 0;
    let newOrder;

    if (paymentMethod === "online") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",

        line_items: orderItems.map((o) => ({
          price_data: {
            currency: "LKR",
            product_data: { name: o.item.name },
            unit_amount: Math.round(o.item.price * 100),
          },
          quantity: o.quantity,
        })),
        customer_email: email,
        success_url: `${process.env.FRONTEND_URL}/myOrders/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout?payment_status=cancel`,
        metadata: { firstName, lastName, email, phone },
      });

      newOrder = new orderModel({
        user: req.user._id,
        firstName,
        lastName,
        phone,
        email,
        address,
        city,
        zipCode,
        paymentMethod,
        // subtotal,
        subTotal: subtotal,
        tax,
        total,
        shipping: shippingCost,
        items: orderItems,
        paymentIntentId: session.payment_intent,
        sessionId: session.id,
        paymentStatus: "pending",
      });

      await newOrder.save();
      return res.status(201).json({
        success: true,
        message: "Order created successfully! Please complete the payment.",
        order: newOrder,
        checkoutUrl: session.url,
      });
    }

    newOrder = new orderModel({
      user: req.user._id,
      firstName,
      lastName,
      phone,
      email,
      address,
      city,
      zipCode,
      paymentMethod,
      // subtotal,
      subTotal: subtotal,
      tax,
      total,
      shipping: shippingCost,
      items: orderItems,
      paymentStatus: "succeeded",
    });

    await newOrder.save();
    return res.status(201).json({
      success: true,
      message: "Order created successfully!",
      order: newOrder,
      checkoutUrl: null,
    });
  } catch (error) {
    console.error("Order Create Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create the order",
      error: `Order Create Error: ${error.message}`,
    });
  }
};

/* -------- Order Confirm Payment -------- */
export const orderConfirmPayment = async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res
        .status(400)
        .json({ success: false, message: "Session ID is required." });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === "paid") {
      const order = await orderModel.findOneAndUpdate(
        { sessionId: session_id },
        { paymentStatus: "succeeded" },
        { new: true },
      );

      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found." });
      }

      return res.status(200).json({
        success: true,
        message: "Order payment confirmed successfully!",
        order,
      });
    }

    return res
      .status(400)
      .json({ success: false, message: "Order payment is not completed." });
  } catch (error) {
    console.error("Order Confirm Payment Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Order failed to confirm payment.",
      error: `Order Confirm Payment Error: ${error.message}`,
    });
  }
};

/* -------- Orders Get -------- */
export const ordersGet = async (req, res) => {
  try {
    const filter = { user: req.user._id };
    const rawOrders = await orderModel
      .find(filter)
      .sort({ createdAt: -1 })
      .lean();

    const formatted = rawOrders.map((o) => ({
      ...o,
      items: o.items.map((i) => ({
        _id: i._id,
        item: i.item,
        quantity: i.quantity,
      })),
      createdAt: o.createdAt,
      paymentStatus: o.paymentStatus,
    }));

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      orders: formatted,
    });
  } catch (error) {
    console.error("Orders Get Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Order failed to fetch.",
      error: `Orders Get Error: ${error.message}`,
    });
  }
};

/* -------- Order Admin Get All -------- */
export const orderAdminGetAll = async (req, res) => {
  try {
    const raw = await orderModel.find({}).sort({ createdAt: -1 }).lean();

    const formatted = raw.map((o) => ({
      _id: o._id,
      user: o.user,
      firstName: o.firstName,
      lastName: o.lastName,
      email: o.email,
      phone: o.phone,
      address: o.address ?? o.shippingAddress?.address ?? "",
      city: o.city ?? o.shippingAddress?.city ?? "",
      zipCode: o.zipCode ?? o.shippingAddress?.zipCode ?? "",
      paymentMethod: o.paymentMethod,
      paymentStatus: o.paymentStatus,
      status: o.status,
      createdAt: o.createdAt,
      items: o.items.map((i) => ({
        _id: i._id,
        item: i.item,
        quantity: i.quantity,
      })),
    }));

    return res.status(200).json({
      success: true,
      message: "All orders fetched successfully!",
      orders: formatted,
    });
  } catch (error) {
    console.error("Order Admin Get All Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch all orders.",
      error: `Order Admin Get All Error: ${error.message}`,
    });
  }
};

/* -------- Order Update Any By Admin -------- */
export const orderUpdateAnyByAdmin = async (req, res) => {
  try {
    const updated = await orderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found for the given ID." });
    }

    return res
      .status(200)
      .json({ success: true, message: "Order updated successfully!", updated });
  } catch (error) {
    console.error("Order Update Any By Admin Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update the order due to server error.",
      error: `Order Update Any By Admin Error: ${error.message}`,
    });
  }
};

/* -------- Order Get By Id -------- */
export const orderGetById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    if (!order.user.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Order does not belong to the current user.",
      });
    }

    if (req.query.email && order.email !== req.query.email) {
      return res.status(403).json({
        success: false,
        message: "Order email does not match the query email.",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Order fetched successfully!", order });
  } catch (error) {
    console.error("Order Get By Id Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: `Order Get By Id Error: ${error.message}`,
    });
  }
};

/* -------- Order Update By Id -------- */
export const orderUpdateById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    if (!order.user.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Order does not belong to the current user.",
      });
    }

    if (req.body.email && order.email !== req.body.email) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Order email does not match the provided email.",
        });
    }

    const updated = await orderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    return res
      .status(200)
      .json({ success: true, message: "Order updated successfully!", updated });
  } catch (error) {
    console.error("Order Update By Id Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update the order.",
      error: `Order Update By Id Error: ${error.message}`,
    });
  }
};
