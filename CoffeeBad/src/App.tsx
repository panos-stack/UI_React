import { useState } from 'react';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { PaymentMethod } from './components/PaymentMethod';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

export type ViewMode = 'menu' | 'cart' | 'payment' | 'checkout' | 'confirmation';

export default function App() {
  const [view, setView] = useState<ViewMode>('menu');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedStop, setSelectedStop] = useState<string>('');
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', cardName: '', expiry: '', cvv: '' });

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(i => i.id !== id));
    } else {
      setCart(prev => prev.map(i => 
        i.id === id ? { ...i, quantity } : i
      ));
    }
  };

  const completeOrder = (stop: string) => {
    setSelectedStop(stop);
    const orderNum = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderNumber(orderNum);
    setView('confirmation');
  };

  const resetApp = () => {
    setCart([]);
    setSelectedStop('');
    setOrderNumber('');
    setPaymentInfo({ cardNumber: '', cardName: '', expiry: '', cvv: '' });
    setView('menu');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 p-4">
      <div className="max-w-md mx-auto">
        {view === 'menu' && (
          <Menu 
            onAddToCart={addToCart} 
            onNavigate={setView}
            cartCount={totalItems}
          />
        )}
        {view === 'cart' && (
          <Cart 
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onNavigate={setView}
          />
        )}
        {view === 'payment' && (
          <PaymentMethod 
            cart={cart}
            paymentInfo={paymentInfo}
            onUpdatePayment={setPaymentInfo}
            onNavigate={setView}
          />
        )}
        {view === 'checkout' && (
          <Checkout 
            cart={cart}
            onComplete={completeOrder}
            onNavigate={setView}
          />
        )}
        {view === 'confirmation' && (
          <OrderConfirmation 
            orderNumber={orderNumber}
            busStop={selectedStop}
            cart={cart}
            onReset={resetApp}
          />
        )}
      </div>
    </div>
  );
}