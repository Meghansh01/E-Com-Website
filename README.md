# 🛒 E-Com Website

A modern, responsive **React + Tailwind CSS** e-commerce front-end.  
Features product listings, cart management, checkout flow, dark/light mode, and toast notifications.  

![Demo Screenshot](./src/assets/products/demo.png) <!-- replace with actual screenshot -->

---

## ✨ Features

- 📦 **Product Catalog** — Homepage with categories, hero banner & grid (3 products per row).  
- 🔍 **Search Bar** — Extends till cart icon, filters products responsively.  
- 🌓 **Dark/Light Mode Toggle** — Applies across the whole app.  
- 🛍️ **Cart Page** — Quantity controls (+/-), remove item, order summary with total.  
- 💳 **Checkout Page** — Simple form with amount summary & "Place Order" button.  
- 🔔 **Toast Notifications** — Using `react-hot-toast` for cart actions.  
- 📱 **Fully Responsive** — Optimized for desktop and mobile.  

---

## 📂 Project Structure
client/
├─ public/
│ └─ images/ # public assets
├─ src/
│ ├─ assets/ # product images & logos
│ ├─ components/ # reusable UI (Header, ProductCard, Sidebar, Hero...)
│ ├─ context/ # CartContext for global state
│ ├─ pages/ # Home, ProductDetail, CartPage, Checkout, Signup, Signin
│ ├─ products.js # product data with imported images
│ ├─ App.jsx # routes & main layout
│ └─ main.jsx # entry + toaster
├─ index.html
├─ package.json
├─ tailwind.config.cjs
├─ postcss.config.cjs
└─ README.md

---

##🌐 Deployment

This project is deployment-ready ✅.
You can deploy easily on platforms like:

Vercel

Netlify

GitHub Pages

⚡ Just run npm run build and deploy the dist/ folder.

🔮 Future Enhancements

👤 User accounts (login, signup, order history)

💳 Payment gateway integration

🗄️ Backend support (Node.js + DB for real products & orders)

🎯 Search filters, categories & pagination

🛒 Saved carts / Wishlist

---

##🛠️ Tech Stack

Frontend: React, Vite, Tailwind CSS

State Management: Context API

Routing: React Router

Notifications: react-hot-toast

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Built with ❤️ by Meghansh
