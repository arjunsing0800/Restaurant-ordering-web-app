# 🍽️ FoodHub

> A modern digital restaurant table-ordering experience built with React.

FoodHub is a modern, client-side restaurant ordering application that allows customers to browse a digital menu, select their table, add food items to a cart, review their order with GST calculation, and place an order directly from their mobile device.

The project demonstrates how traditional physical restaurant menus can be replaced with a fast, interactive, and visually engaging digital ordering experience.

---

# 🌟 Features

* 🪑 Select from 12 restaurant tables
* 📱 Digital restaurant menu
* 🔍 Search menu items
* 🏷️ Category-based filtering
* 🍕 Browse 16 food items
* 🟢 Veg / Non-Veg indicators
* ⭐ Food ratings and preparation time
* 🔥 Popular item badges
* 🛒 Add items to cart
* ➕ Increase or decrease item quantity
* ❌ Remove items from cart
* 🧾 Automatic bill calculation
* 💰 5% GST calculation
* ✅ Order confirmation screen
* 🔔 Toast notifications
* ⏳ Loading skeleton animation
* 🌙 Modern dark theme
* ✨ Glassmorphism UI
* 🎨 Smooth CSS animations
* 📱 Responsive layout
* ♿ Reduced motion accessibility support

---

# 🎯 Problem Statement

Traditional restaurant ordering often depends on physical menus and manual interaction with waiters.

This can create several problems:

* Customers need to wait for menus.
* Updating printed menus is difficult.
* Ordering can take longer during busy hours.
* There is limited digital interaction.
* Restaurant staff must manually manage customer orders.

FoodHub provides a digital-first approach where customers can access the menu directly from their phones and build their order independently.

---

# 💡 Solution

FoodHub provides a simple digital ordering flow:

```text
Customer Opens FoodHub
        ↓
Selects Restaurant Table
        ↓
Browses Digital Menu
        ↓
Searches or Filters Food Items
        ↓
Adds Items to Cart
        ↓
Reviews Order
        ↓
GST Calculation
        ↓
Places Order
        ↓
Order Confirmation
```

---

# 🏗️ Application Architecture

FoodHub is currently built as a **client-side Single Page Application (SPA)**.

```text
┌──────────────────────────────────────────────┐
│                  FOODHUB APP                 │
├──────────────────────────────────────────────┤
│                                              │
│              React Single Page App           │
│                                              │
│      ┌──────────┐                            │
│      │ Landing  │                            │
│      │  Page    │                            │
│      │ (Table)  │                            │
│      └────┬─────┘                            │
│           │                                  │
│           ▼                                  │
│      ┌──────────┐                            │
│      │   Menu   │                            │
│      │   Page   │                            │
│      └────┬─────┘                            │
│           │                                  │
│           ▼                                  │
│      ┌──────────┐                            │
│      │   Cart   │                            │
│      │   Page   │                            │
│      └──────────┘                            │
│                                              │
│        React useState (In-Memory State)      │
│                                              │
│     No Backend • No Database • No API        │
│                                              │
└──────────────────────────────────────────────┘
```

---

# 🔄 Application Flow

## 1. Table Selection

When the user opens the application, they are presented with a visual restaurant table selection interface.

The customer can select one of **12 available tables**.

Once a table is selected:

* Visual selection feedback appears.
* The selected table is highlighted.
* The continue button becomes active.

---

## 2. Menu Browsing

After selecting a table, the customer enters the digital menu.

The menu includes:

* Food images
* Food names
* Descriptions
* Categories
* Prices
* Ratings
* Preparation times
* Veg / Non-Veg indicators
* Popular item badges

The application currently contains:

* **16 Menu Items**
* **7 Food Categories**

---

## 3. Search and Filtering

Customers can quickly find food items using:

### Search

Search functionality filters menu items based on:

* Food name
* Food description

### Categories

Users can filter food using category chips.

Example categories include:

```text
Pizza
Burgers
Salads
Indian
Beverages
Desserts
```

---

## 4. Cart Management

Users can add menu items to their cart.

The cart supports:

* Adding items
* Increasing quantity
* Decreasing quantity
* Removing items
* Updating the total dynamically

The application uses React state to manage cart data.

---

## 5. Bill Calculation

The cart automatically calculates:

```text
Subtotal
   +
5% GST
   =
Final Total
```

Example:

```text
Subtotal: ₹1000
GST (5%): ₹50

Total: ₹1050
```

---

## 6. Order Confirmation

After clicking **Place Order**, the customer receives a confirmation screen containing:

* Success message
* Selected table number
* Estimated preparation time
* Final order amount

After a short delay, the application automatically returns to the landing page and clears the cart.

---

# 🛠️ Tech Stack

| Technology       | Purpose                    |
| ---------------- | -------------------------- |
| React 19         | Frontend UI Library        |
| Vite             | Development and Build Tool |
| JavaScript (JSX) | Programming Language       |
| lucide-react     | Icons                      |
| Google Fonts     | Typography                 |
| Unsplash         | Food Images                |
| ESLint           | Code Quality               |
| CSS              | Styling and Animations     |

---

# 📦 Dependencies

### Main Dependencies

```json
{
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "lucide-react": "^1.21.0"
}
```

### Development Tools

```text
Vite
ESLint
React StrictMode
```

---

# 📂 Project Structure

```text
FoodHub/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

# 🧠 State Management

FoodHub currently uses React's built-in `useState` hook for application state management.

The main application manages:

```text
page
tableNumber
cartItems
```

Individual components manage additional UI state such as:

```text
selectedTable
activeCategory
searchQuery
cart
isLoading
ordered
```

The data flow follows a simple React pattern:

```text
Root Component
      ↓
Props Passed to Child Components
      ↓
User Interaction
      ↓
Callback Functions
      ↓
State Updated in Parent
      ↓
UI Re-renders
```

---

# 🖥️ Pages

FoodHub currently contains three main application views.

## 🏠 Landing Page

The landing page allows customers to:

* View restaurant branding
* Select a table
* View available tables
* Continue to the menu

---

## 🍔 Menu Page

The menu page provides:

* Search functionality
* Category filters
* Food cards
* Ratings
* Preparation time
* Veg / Non-Veg indicators
* Add to cart functionality
* Floating cart button

---

## 🛒 Cart Page

The cart page provides:

* Selected food items
* Quantity controls
* Remove item functionality
* Subtotal calculation
* GST calculation
* Total bill
* Order placement
* Confirmation screen

---

# 🎨 UI & Design

FoodHub uses a modern restaurant-inspired visual design.

### Design Highlights

* Dark background
* Gold / Amber accent colors
* Glassmorphism cards
* Backdrop blur effects
* Smooth transitions
* Floating animations
* Glow effects
* Toast notifications
* Shimmer loading effects
* Responsive layouts

---

# ✨ Animations

The application includes multiple CSS animations for a polished user experience.

Examples include:

* Floating animations
* Fade-up transitions
* Glow effects
* Pop animations
* Shimmer loading
* Toast transitions
* Cart animations

The application also supports reduced-motion preferences for better accessibility.

---

# 🚀 Getting Started

Follow these steps to run the project locally.

## Prerequisites

Make sure you have installed:

* Node.js
* npm

Check your installation:

```bash
node -v
npm -v
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/FoodHub.git
```

### 2. Navigate to the Project

```bash
cd FoodHub
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will start on:

```text
http://localhost:5173
```

---

# 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

# 📊 Current Implementation Status

## Overall Status

```text
Frontend Prototype / MVP
```

### Completion Overview

| Area               | Status            |
| ------------------ | ----------------- |
| Frontend UI        | ✅ Completed       |
| Table Selection    | ✅ Completed       |
| Digital Menu       | ✅ Completed       |
| Search & Filtering | ✅ Completed       |
| Cart System        | ✅ Completed       |
| GST Calculation    | ✅ Completed       |
| Order Confirmation | ✅ Completed       |
| Backend            | ❌ Not Implemented |
| Database           | ❌ Not Implemented |
| Authentication     | ❌ Not Implemented |
| Payment System     | ❌ Not Implemented |
| Testing            | ❌ Not Implemented |
| CI/CD              | ❌ Not Implemented |

---

# ⚠️ Current Limitations

FoodHub is currently a frontend prototype.

The following limitations exist:

* No backend server
* No database
* No API integration
* No authentication
* No payment gateway
* No persistent cart
* Refreshing the browser resets the application
* Orders are not actually sent to restaurant staff
* No restaurant admin dashboard
* Menu data is hardcoded
* Prices are hardcoded
* No automated testing
* No CI/CD pipeline
* No real-time order tracking

---

# 🔮 Future Roadmap

## Phase 1 — Frontend Improvements

* [ ] Split `App.jsx` into reusable components
* [ ] Add proper folder structure
* [ ] Add React Router
* [ ] Add localStorage persistence
* [ ] Remove unused Vite template files
* [ ] Add custom branding and favicon
* [ ] Add TypeScript
* [ ] Improve mobile responsiveness

---

## Phase 2 — Backend Development

* [ ] Build REST API
* [ ] Add database integration
* [ ] Implement real order submission
* [ ] Store restaurant menu dynamically
* [ ] Add restaurant order management system
* [ ] Create admin dashboard

### Possible Backend Stack

```text
Node.js / Express
or
FastAPI
```

### Possible Database

```text
PostgreSQL
MongoDB
```

---

## Phase 3 — Advanced Features

* [ ] User authentication
* [ ] Customer accounts
* [ ] Restaurant admin accounts
* [ ] Order history
* [ ] Order tracking
* [ ] Payment integration
* [ ] Menu management dashboard
* [ ] Mobile PWA support
* [ ] Notifications

---

## Phase 4 — Production & Scaling

* [ ] GitHub Actions CI/CD
* [ ] Docker containerization
* [ ] Error monitoring
* [ ] Performance optimization
* [ ] Image lazy loading
* [ ] Code splitting
* [ ] Multi-restaurant support
* [ ] Real-time order tracking
* [ ] WebSocket integration
* [ ] Analytics dashboard
* [ ] AI-powered food recommendations
* [ ] Reservation system
* [ ] Restaurant staff application

---

# 🔐 Security Status

Since FoodHub is currently a client-side application:

* No user credentials are stored.
* No backend secrets are exposed.
* No database is connected.
* No user data is persisted.

However, before production deployment, the following should be implemented:

* Authentication
* Input validation
* Input sanitization
* HTTPS enforcement
* Security headers
* Content Security Policy
* Rate limiting
* CSRF protection
* XSS protection

---

# 🧪 Testing

Testing is not currently implemented.

Future testing should include:

### Unit Testing

* Cart calculations
* GST calculations
* Quantity controls
* Search functionality
* Category filtering

### Component Testing

* Menu cards
* Cart components
* Toast notifications
* Loading skeleton

### Integration Testing

Complete user flow:

```text
Select Table
      ↓
Browse Menu
      ↓
Search Food
      ↓
Add to Cart
      ↓
Update Quantity
      ↓
Review Bill
      ↓
Place Order
```

### Recommended Tools

```text
Vitest
React Testing Library
Playwright
```

---

# 📈 Performance Considerations

The current application is lightweight and suitable for a frontend prototype.

Future improvements can include:

* Lazy loading food images
* Font optimization
* Code splitting
* Service workers
* PWA caching
* CDN optimization
* Image compression

---

# 🤝 Contributing

Contributions are welcome!

If you would like to contribute:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add: your feature"
```

5. Push to your branch

```bash
git push origin feature/your-feature-name
```

6. Open a Pull Request

---

# 📄 License

This project is currently intended for educational and portfolio purposes.

You can add an MIT License or another open-source license depending on your project requirements.


---

# 🙏 Acknowledgements

* React
* Vite
* lucide-react
* Unsplash
* Google Fonts

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

---

<div align="center">

### Built with ❤️ using React

**FoodHub — Making Restaurant Ordering Simple, Digital, and Modern.**

</div>
