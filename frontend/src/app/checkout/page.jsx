"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cardContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiCreditCard, FiLock, FiCheck, FiArrowLeft } from "react-icons/fi";
import { Button } from "@/components/common/Button";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "Sri Lanka",
    
    // Payment Info
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate shipping info
  const validateShipping = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate payment info
  const validatePayment = () => {
    const newErrors = {};
    
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    else if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required";
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
    else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Format: MM/YY";
    }
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
    else if (formData.cvv.length !== 3) newErrors.cvv = "CVV must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle continue to payment
  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep(2);
    }
  };

  // Handle place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validatePayment()) return;

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      
      // Clear cart after successful order
      setTimeout(() => {
        clearCart();
      }, 2000);
    }, 2000);
  };

  // Redirect if cart is empty (except on success page)
  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <Button onClick={() => router.push("/products")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  // Calculate shipping
  const shipping = total >= 250 ? 0 : 15;
  const tax = total * 0.1; // 10% tax
  const grandTotal = total + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => step === 1 ? router.back() : setStep(step - 1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <FiArrowLeft /> Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <StepIndicator number={1} active={step >= 1} completed={step > 1} label="Shipping" />
            <div className={`w-24 h-1 ${step > 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <StepIndicator number={2} active={step >= 2} completed={step > 2} label="Payment" />
            <div className={`w-24 h-1 ${step > 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <StepIndicator number={3} active={step >= 3} completed={step > 3} label="Complete" />
          </div>
        </div>

        {/* Content */}
        {step === 1 && (
          <ShippingForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleContinueToPayment}
            items={items}
            total={total}
            shipping={shipping}
            tax={tax}
            grandTotal={grandTotal}
          />
        )}

        {step === 2 && (
          <PaymentForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={handlePlaceOrder}
            loading={loading}
            items={items}
            total={total}
            shipping={shipping}
            tax={tax}
            grandTotal={grandTotal}
          />
        )}

        {step === 3 && (
          <OrderSuccess
            orderId={`ORD-${Date.now()}`}
            email={formData.email}
            onContinue={() => router.push("/products")}
          />
        )}
      </div>
    </div>
  );
}

// Step Indicator Component
const StepIndicator = ({ number, active, completed, label }) => (
  <div className="flex flex-col items-center">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
        completed
          ? "bg-blue-600 text-white"
          : active
          ? "bg-blue-600 text-white"
          : "bg-gray-300 text-gray-600"
      }`}
    >
      {completed ? <FiCheck /> : number}
    </div>
    <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">{label}</span>
  </div>
);

// Shipping Form Component
const ShippingForm = ({ formData, errors, onChange, onSubmit, items, total, shipping, tax, grandTotal }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Form */}
    <div className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Shipping Information
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={onChange}
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                  errors.firstName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={onChange}
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                  errors.lastName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.address ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onChange}
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                  errors.city ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                State/Province
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={onChange}
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                  errors.zip ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-6">
            Continue to Payment
          </Button>
        </form>
      </div>
    </div>

    {/* Order Summary */}
    <OrderSummary items={items} total={total} shipping={shipping} tax={tax} grandTotal={grandTotal} />
  </div>
);

// Payment Form Component
const PaymentForm = ({ formData, errors, onChange, onSubmit, loading, items, total, shipping, tax, grandTotal }) => {
  // Format card number
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    onChange({ target: { name: "cardNumber", value } });
  };

  // Format expiry date
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    onChange({ target: { name: "expiryDate", value } });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <FiCreditCard className="text-2xl text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Payment Details
            </h2>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <FiLock className="text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Secure Payment
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Card Number *
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                  errors.cardNumber ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cardholder Name *
              </label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={onChange}
                placeholder="John Doe"
                className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                  errors.cardName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                    errors.expiryDate ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CVV *
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                    onChange({ target: { name: "cvv", value } });
                  }}
                  placeholder="123"
                  className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                    errors.cvv ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-6" 
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay €${grandTotal.toFixed(2)}`}
            </Button>
          </form>
        </div>
      </div>

      {/* Order Summary */}
      <OrderSummary items={items} total={total} shipping={shipping} tax={tax} grandTotal={grandTotal} />
    </div>
  );
};

// Order Summary Component
const OrderSummary = ({ items, total, shipping, tax, grandTotal }) => (
  <div className="lg:col-span-1">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Order Summary
      </h2>
      
      <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item._id} className="flex gap-3">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image || "/uploads/default.jpg"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                {item.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Qty: {item.quantity}
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                €{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="text-gray-900 dark:text-white">€{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span className="text-gray-900 dark:text-white">
            {shipping === 0 ? "FREE" : `€${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
          <span className="text-gray-900 dark:text-white">€{tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
          <span className="text-lg font-bold text-blue-600">€{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {shipping === 0 && (
        <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-700 dark:text-green-300 text-center">
            🎉 You qualify for free shipping!
          </p>
        </div>
      )}
    </div>
  </div>
);

// Order Success Component
const OrderSuccess = ({ orderId, email, onContinue }) => (
  <div className="max-w-2xl mx-auto">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiCheck className="text-4xl text-green-600 dark:text-green-400" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Order Placed Successfully!
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Order Number</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{orderId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Confirmation Email</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{email}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        A confirmation email has been sent to <strong>{email}</strong> with your order details.
      </p>

      <Button onClick={onContinue} className="w-full md:w-auto">
        Continue Shopping
      </Button>
    </div>
  </div>
);