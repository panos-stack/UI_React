import { useState } from 'react';
import { CartItem, BusStop } from './types';
import { CreditCard, Check } from 'lucide-react';

interface CheckoutProps {
  items: CartItem[];
  selectedStop: BusStop;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export function Checkout({
  items,
  selectedStop,
  onBack,
  onPlaceOrder,
}: CheckoutProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const validateForm = () => {
    const newErrors = {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    };

    const cleanedCardNumber = cardNumber.replace(/\s/g, '');
    if (!cleanedCardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cleanedCardNumber.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!cardHolder.trim()) {
      newErrors.cardHolder = 'Cardholder name is required';
    }

    if (!expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'Invalid format (MM/YY)';
    }

    if (!cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cvv.length < 3) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      onPlaceOrder();
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h2 className="text-gray-900 mb-8">Checkout</h2>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Order Details */}
        <div className="col-span-2 space-y-6">
          {/* Delivery Details */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Delivery Details</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900">{selectedStop.name}</p>
              <p className="text-gray-600 mt-1">{selectedStop.route}</p>
              <p className="text-gray-600 mt-1">
                Estimated arrival: {selectedStop.estimatedArrival}
              </p>
            </div>
            <button
              onClick={onBack}
              className="mt-4 text-amber-600 hover:text-amber-700"
            >
              Change delivery location
            </button>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Payment Method</h3>
            <div className="space-y-4">
              {/* Card Number */}
              <div>
                <label className="block text-gray-700 mb-2">Card Number</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full border-2 border-gray-200 rounded-lg p-3 pl-12 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  placeholder="JOHN DOE"
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-amber-600 focus:outline-none"
                />
                {errors.cardHolder && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>
                )}
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-amber-600 focus:outline-none"
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                    placeholder="123"
                    maxLength={4}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-amber-600 focus:outline-none"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={`${item.drink.id}-${item.size}-${index}`}
                  className="flex items-center gap-4 pb-3 border-b border-gray-100 last:border-0"
                >
                  <img
                    src={item.drink.image}
                    alt={item.drink.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-gray-900">{item.drink.name}</p>
                    <p className="text-gray-600">
                      {item.size} • {item.shop.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-24">
            <h3 className="text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>€{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-900 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className={`w-full py-3 rounded-lg transition-colors ${
                cardNumber
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Place Order
            </button>

            <p className="text-gray-500 text-center mt-4">
              Your order will be ready at {selectedStop.name}
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onBack}
          className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back to Bus Stop Selection
        </button>
      </div>
    </div>
  );
}