import { useState, useEffect } from 'react';
import { Header } from './Header';
import { ShopSelection } from './ShopSelection';
import { DrinkMenu } from './DrinkMenu';
import { Cart } from './Cart';
import { BusStopSelection } from './BusStopSelection';
import { Checkout } from './Checkout';
import { OrderConfirmation } from './OrderConfirmation';
import { CoffeeShop, Drink, CartItem, BusStop } from './types';
import { coffeeShops, drinks, busStops, paymentCards } from './data/mockData';

type AppState =
  | 'shop-selection'
  | 'drink-menu'
  | 'bus-stop-selection'
  | 'checkout'
  | 'order-confirmed';

interface CoffeeOrderingAppProps {
  onBack: () => void;
}

export function CoffeeOrderingApp({ onBack }: CoffeeOrderingAppProps) {
  const [appState, setAppState] = useState<AppState>('shop-selection');
  const [selectedShop, setSelectedShop] = useState<CoffeeShop | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedBusStop, setSelectedBusStop] = useState<BusStop | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');

  const handleSelectShop = (shop: CoffeeShop) => {
    setSelectedShop(shop);
    setAppState('drink-menu');
  };

  const handleBackToShopSelection = () => {
    setSelectedShop(null);
    setAppState('shop-selection');
  };

  const handleAddToCart = (drink: Drink, size: string, price: number) => {
    if (!selectedShop) return;

    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.drink.id === drink.id &&
        item.size === size &&
        item.shop.id === selectedShop.id
    );

    if (existingItemIndex > -1) {
      const newItems = [...cartItems];
      newItems[existingItemIndex].quantity += 1;
      setCartItems(newItems);
    } else {
      setCartItems([
        ...cartItems,
        { drink, size, quantity: 1, shop: selectedShop, price },
      ]);
    }
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(index);
      return;
    }

    const newItems = [...cartItems];
    newItems[index].quantity = newQuantity;
    setCartItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
  };

  const handleProceedToDelivery = () => {
    setShowCart(false);
    setAppState('bus-stop-selection');
  };

  const handleSelectBusStop = (stop: BusStop) => {
    setSelectedBusStop(stop);
  };

  const handleContinueToCheckout = () => {
    setAppState('checkout');
  };

  const handleBackToBusStopSelection = () => {
    setAppState('bus-stop-selection');
  };

  const handlePlaceOrder = () => {
    const orderNum = `BUS${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setOrderNumber(orderNum);
    setAppState('order-confirmed');
  };

  const handleNewOrder = () => {
    setCartItems([]);
    setSelectedShop(null);
    setSelectedBusStop(null);
    setOrderNumber('');
    setAppState('shop-selection');
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Redirect to shop selection if cart becomes empty
  useEffect(() => {
    if (cartItems.length === 0 && (appState === 'bus-stop-selection' || appState === 'checkout')) {
      setAppState('shop-selection');
      setSelectedShop(null);
      setSelectedBusStop(null);
    }
  }, [cartItems, appState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Menu
          </button>
        

      <div className="min-h-screen bg-gray-50">
        {appState !== 'order-confirmed' && (
          <Header cartItemsCount={totalCartItems} onViewCart={() => setShowCart(true)} />
        )}

        {appState === 'shop-selection' && (
          <ShopSelection shops={coffeeShops} onSelectShop={handleSelectShop} />
        )}

        {appState === 'drink-menu' && selectedShop && (
          <DrinkMenu
            shop={selectedShop}
            drinks={drinks}
            onBack={handleBackToShopSelection}
            onAddToCart={handleAddToCart}
          />
        )}

        {appState === 'bus-stop-selection' && (
          <BusStopSelection
            busStops={busStops}
            selectedStop={selectedBusStop}
            onSelectStop={handleSelectBusStop}
            onContinue={handleContinueToCheckout}
            onBackToMenu={() => {
              if (selectedShop) {
                setAppState('drink-menu');
              }
            }}
            onBackToShops={() => setAppState('shop-selection')}
          />
        )}

        {appState === 'checkout' && selectedBusStop && (
          <Checkout
            items={cartItems}
            selectedStop={selectedBusStop}
            onBack={handleBackToBusStopSelection}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {appState === 'order-confirmed' && selectedBusStop && (
          <OrderConfirmation
            orderNumber={orderNumber}
            selectedStop={selectedBusStop}
            onNewOrder={handleNewOrder}
          />
        )}

        {showCart && (
          <Cart
            items={cartItems}
            onClose={() => setShowCart(false)}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onProceedToDelivery={handleProceedToDelivery}
          />
        )}
      </div>
    </div>
  </div>
  );
}