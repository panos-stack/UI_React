import { CartItem } from './types';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (index: number, newQuantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToDelivery: () => void;
}

export function Cart({
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToDelivery,
}: CartProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = items.length > 0 ? 2.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Your cart is empty</p>
              <p className="text-gray-500 mt-2">Add some drinks to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.drink.id}-${item.size}-${index}`}
                  className="bg-gray-50 rounded-lg p-4 flex items-center gap-4"
                >
                  <img
                    src={item.drink.image}
                    alt={item.drink.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-gray-900">{item.drink.name}</h3>
                    <p className="text-gray-600">
                      {item.size} • {item.shop.name}
                    </p>
                    <p className="text-amber-600 mt-1">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        onUpdateQuantity(index, Math.max(0, item.quantity - 1))
                      }
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-3">
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
            <button
              onClick={onProceedToDelivery}
              className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors mt-4"
            >
              Select Delivery Stop
            </button>
          </div>
        )}
      </div>
    </div>
  );
}