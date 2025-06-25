# 🥚 Harley's Egg Shop

A modern e-commerce web application for Harley's family-owned egg farm in Barangay Vito, Minglanilla Cebu, Philippines. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

### 🛒 E-commerce Features
- **Quantity Selection**: Choose between individual eggs, half-dozen (6 eggs), or dozen (12 eggs)
- **Shopping Cart**: Add, remove, and manage items with real-time updates
- **Order History**: View all past orders with detailed information
- **Reorder Functionality**: One-click reorder from previous orders

### 💳 Payment & Delivery
- **Multiple Payment Methods**: GCash, PayMaya, and Bank Transfer
- **Delivery Time Slots**: Morning (8AM-12PM), Afternoon (1PM-5PM), Evening (6PM-9PM)
- **Customer Information**: Complete delivery details collection
- **Order Tracking**: Visual status indicators for order progress

### 🎨 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, farm-themed design with beautiful animations
- **Local Storage**: Persistent cart and order history
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harlvilleta/egg.git
   cd egg
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
app/
├── components/          # React components
│   ├── Cart.tsx        # Shopping cart functionality
│   ├── Checkout.tsx    # Checkout process
│   ├── OrderHistory.tsx # Order history display
│   ├── ProductCard.tsx # Product display cards
│   ├── QuantitySelector.tsx # Quantity selection
│   └── ...
├── context/            # React contexts
│   ├── OrderContext.tsx # Order management
│   └── UserContext.tsx # User state management
├── page.tsx           # Main page
├── layout.tsx         # Root layout
└── globals.css        # Global styles
```

## 🛠️ Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Context** - State management
- **Local Storage** - Data persistence

## 📱 Features in Detail

### Quantity Selection
- Individual eggs (1 egg)
- Half-dozen (6 eggs)
- Dozen (12 eggs)
- Real-time total calculation

### Order Management
- Complete order history
- Order status tracking
- Detailed order information
- Reorder functionality

### Payment Integration
- GCash mobile payment
- PayMaya digital wallet
- Bank transfer option
- Secure checkout process

### Delivery System
- Flexible time slots
- Address management
- Contact information
- Special instructions

## 🎯 How to Use

1. **Browse Products**: View available egg products with descriptions and pricing
2. **Select Quantity**: Choose your preferred quantity type and amount
3. **Add to Cart**: Items are added to your shopping cart
4. **Checkout**: Complete the two-step checkout process
5. **Order History**: View and reorder from your order history

## 🌟 Key Features

- **Farm-Fresh Theme**: Beautiful farm-themed design
- **Mobile Responsive**: Works on all devices
- **Fast Performance**: Optimized for speed
- **User-Friendly**: Intuitive navigation and interactions
- **Data Persistence**: Cart and orders saved locally

## 📄 License

This project is licensed under the MIT License.

## 👨‍🌾 About Harley's Egg Shop

Harley's Egg Shop is a family-owned farm located in Barangay Vito, Minglanilla Cebu, Philippines. We are dedicated to providing the freshest, highest-quality eggs from our free-range chickens.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

- **Location**: Barangay Vito, Minglanilla Cebu, 6046
- **GitHub**: [@harlvilleta](https://github.com/harlvilleta)

---

Made with ❤️ for Harley's Egg Shop
