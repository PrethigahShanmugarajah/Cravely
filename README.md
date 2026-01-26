# 🍕 Cravely – Food Delivery Website (MERN Stack)

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6-green?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4-lightgrey?logo=express)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-UI-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-blueviolet?logo=stripe)](https://stripe.com/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Messaging-green?logo=whatsapp)](https://www.whatsapp.com/)

**Cravely** is a **modern, fully responsive food delivery web application** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).  
This project demonstrates a **complete end-to-end food ordering system** with **Stripe payment integration**, **WhatsApp order notifications**, and a **dedicated admin panel**, making it ideal for learning, portfolios, and real-world development practice.

Inspired by real food delivery platforms, Cravely focuses on **clean UI/UX**, **scalable backend architecture**, and **production-ready features**.

---

## ✨ Features

### 🍴 User Features

[![Cart](https://img.shields.io/badge/Cart-Add_to_Cart-blue)]()
[![Checkout](https://img.shields.io/badge/Checkout-Stripe-green)]()
[![Responsive](https://img.shields.io/badge/Responsive-Mobile--First-9cf)]()
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Order_Update-green)]()

- Browse food items with images and dynamic pricing
- Add items to cart and manage quantities
- Smooth and secure checkout using **Stripe**
- Fully responsive design for mobile, tablet, and desktop
- WhatsApp message trigger on order confirmation
- Clean and modern UI built with Tailwind CSS

---

### 🏪 Admin Features

[![Admin Panel](https://img.shields.io/badge/Admin-Dashboard-blueviolet)]()
[![Menu](https://img.shields.io/badge/Menu-CRUD-green)]()
[![Orders](https://img.shields.io/badge/Orders-Management-orange)]()

- Secure admin dashboard
- Add, update, and delete food items
- Manage menu categories
- View and manage customer orders
- Upload images using a clean admin interface

---

### 💳 Payment Integration

[![Stripe](https://img.shields.io/badge/Stripe-Payments-blueviolet)]()

- Secure Stripe payment gateway
- Real-world payment flow implementation
- Order confirmation after successful payment

---

### 📩 WhatsApp Integration

[![WhatsApp](https://img.shields.io/badge/WhatsApp-Real--Time-green)]()

- Automatic WhatsApp message trigger after order placement
- Direct communication channel for order support

---

## 🛠️ Technologies Used

### **Frontend**

- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- Responsive UI / UX design

### **Backend**

- Node.js
- Express.js
- MongoDB & Mongoose
- Stripe Payment Gateway
- JWT-based Authentication
- WhatsApp messaging integration
- dotenv for environment management

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/PrethigahShanmugarajah/Cravely
cd Cravely
```

````

### 2️⃣ Backend Setup

```bash
cd Server
npm install
npm run server
```

### 3️⃣ Frontend Setup

```bash
cd Client
npm install
npm run dev
```

### 4️⃣ Admin Panel Setup

```bash
cd Admin
npm install
npm run dev
```

---

## 🔑 Environment Variables Setup

### 📂 Backend `.env` (Server/)

```
MONGODB_URI=
JWT_SECRET=
FRONTEND_URL=
FRONTEND_URL_ADMIN=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

```

### 📂 Frontend `.env` (Client/)

```
VITE_BASEURL=
VITE_WHATSAPP_NUMBER=
```

### 📂 Admin `.env` (Admin/)

```
VITE_BASEURL=
```

---

## 📚 Reference Video

Tutorial followed: [YouTube Link](https://youtu.be/6CL4f8fPk9w?si=WOWvudqiHEulXpVc)

---

## 📎 Project Link

[GitHub Repository](https://github.com/PrethigahShanmugarajah/Cravely)

---

## 👨‍💻 Author

**Prethigah Shanmugarajah (2020/2021)**<br>
Department of Software Engineering, <br>
Faculty of Computing,<br>
Sabaragamuwa University of Sri Lanka.

---

````
