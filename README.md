# 🛒 E-Com Website

A modern, responsive **React + Tailwind CSS** e-commerce front-end.  
Features product listings, cart management, checkout flow, dark/light mode, and toast notifications.  


## 📷 Screenshot
![demo page](https://raw.githubusercontent.com/Meghansh01/E-Com-Website/master/client/demo.png) 

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
```
WEBSITEEC/
├── client/
│   ├── node_modules/
│   ├── src/
│   │   ├── assets/
│   │   │   └── products/
│   │   │       ├── dell-xps-13.png
│   │   │       ├── iphone-14.png
│   │   │       ├── leather-wallet.png
│   │   │       ├── levis-jeans.png
│   │   │       ├── macbook-air-m2.png
│   │   │       ├── nike-shoes.png
│   │   │       ├── samsung-galaxy-s23.png
│   │   │       └── sony-headphones.png
│   │   ├── components/
│   │   │   └── ProductCard.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Signin.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── index.html
│   │   ├── main.jsx
│   │   └── products.js
│   ├── demo.png
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.cjs
│   ├── tailwind.config.cjs
│   └── README.md
│
├── server/
│   ├── node_modules/
│   ├── index.js
│   ├── products.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── TODO.md

```
---

## 🌐 Deployment

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

## 🛠️ Tech Stack

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
