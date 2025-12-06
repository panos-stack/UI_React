import { CheckCircle, MapPin, Clock } from 'lucide-react';
import { BusStop } from './types';

interface OrderConfirmationProps {
  orderNumber: string;
  selectedStop: BusStop;
  onNewOrder: () => void;
}

export function OrderConfirmation({
  orderNumber,
  selectedStop,
  onNewOrder,
}: OrderConfirmationProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        <h2 className="text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 mb-8">
          Your coffee will be ready for pickup shortly
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-gray-600 mb-2">Order Number</p>
          <p className="text-gray-900">{orderNumber}</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg">
            <MapPin className="w-6 h-6 text-amber-600" />
            <div className="text-left">
              <p className="text-gray-900">{selectedStop.name}</p>
              <p className="text-gray-600">{selectedStop.route}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="text-gray-900">Estimated Arrival</p>
              <p className="text-gray-600">{selectedStop.estimatedArrival}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-8">
          We'll notify you when your order is ready for pickup. Please be at the
          bus stop by the estimated arrival time.
        </p>

        <button
          onClick={onNewOrder}
          className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Place Another Order
        </button>
      </div>
    </div>
  );
}
