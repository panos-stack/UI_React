import { Coffee, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onViewCart: () => void;
}

export function Header({ cartItemsCount, onViewCart }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-600 p-2 rounded-lg">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-amber-900">BerlBus</h1>
              <p className="text-xs text-gray-500">The smart bus of Berlin</p>
            </div>
          </div>

          <button
            onClick={onViewCart}
            className="relative flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
