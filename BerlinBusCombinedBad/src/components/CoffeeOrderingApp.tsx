import { useState } from 'react';
import { Menu } from './Menu';
import { Cart } from './Cart';
import { PaymentMethod } from './PaymentMethod';
import { Checkout } from './Checkout';
import { OrderConfirmation } from './OrderConfirmation';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

export type ViewMode = 'menu' | 'cart' | 'payment' | 'checkout' | 'confirmation';

interface CeffeeOrderingAppProps {
  onBack: () => void;
}

export function CoffeeOrderingApp({ onBack }: CeffeeOrderingAppProps) {
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
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-8"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <h1 className="text-slate-800 mb-2">Bus Cleaning Service</h1>
            </div>
          </div>
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
    </div>
  );
}

/*

Added these lines: 71-84 + </div> on line 122

<div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-8"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <h1 className="text-slate-800 mb-2">Bus Cleaning Service</h1>
            </div>
          </div>

*/ 





// import { useState } from 'react';
// import { ArrowLeft, Coffee, Cookie, Croissant, Donut, Sandwich} from 'lucide-react';

// interface CoffeeOrderingAppProps {
//   onBack: () => void;
// }

// // Deliberately confusing coffee options with unclear icons
// const coffeeOptions = [
//   { id: 'Espresso', icon: Coffee },
//   { id: 'Cappuccino', icon: Coffee},
//   { id: 'Sandwich', icon: Sandwich },
//   { id: 'Cookie', icon: Cookie },
//   { id: 'Donut', icon: Donut },
//   { id: 'Croissant', icon: Croissant },
// ];

// const stations = [
//   'Central Station',
//   'Market Square', 
//   'University Campus',
//   'Park Avenue',
//   'Shopping District',
//   'Harbor Front'
// ];

// export function CoffeeOrderingApp({ onBack }: CoffeeOrderingAppProps) {
//   const [step, setStep] = useState<'station' | 'coffee' | 'payment' | 'error'>('station');
//   const [selectedStation, setSelectedStation] = useState<string | null>(null);
//   const [selectedCoffee, setSelectedCoffee] = useState<string | null>(null);
//   const [showStationError, setShowStationError] = useState(false);
//   const [times, setTimes] = useState(0);

//   const handleStationSelect = (station: string) => {
//     setSelectedStation(station);
//   };

//   const handleCoffeeSelect = (coffeeId: string) => {
//     setSelectedCoffee(coffeeId);
//   };

//   const handleContinueFromStation = () => {
//     if (selectedStation && times === 0) {
//       setStep('coffee');
//     }
//     else if (selectedStation && times === 1){
//       setStep('payment');
//     }
//   };

//   const handleContinueFromCoffee = () => {
//     if (selectedCoffee) {
//       setStep('payment');
//     }
//   };

//   const handlePayment = () => {
//     if (times === 0){
//       setShowStationError(true);
//       setTimes(1);
//     }
//     else if (times === 1){
//       setShowStationError(false);
//       setTimes(2);
//     }
//   };

//   const handleResetFromError = () => {
//     setShowStationError(false);
//     setSelectedStation(null);
//     setStep('station');
//   };

//   const handleReset = () => {
//     setSelectedCoffee(null);
//     setShowStationError(false);
//     setSelectedStation(null);
//     setTimes(0);
//     setStep('station');
//   }

//   if (showStationError && times === 1) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md w-full">
//           <div className="text-red-600 mb-4">⚠️</div>
//           <h2 className="text-slate-800 mb-4">Oops!</h2>
//           <p className="text-slate-600 mb-8">
//             We just passed {selectedStation}. Please select your station again before payment.
//           </p>
//           <div className="flex justify-start">
//             <button
//               onClick={handleResetFromError}
//               className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
//             >
//               Select again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   else if (!showStationError && times === 2){
//     return(
//         <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8 flex items-center justify-center">
//           <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md w-full">
//             <div className="text-red-600 mb-4"></div>
//             <h2 className="text-slate-800 mb-4">Ok!</h2>
//             <p className="text-slate-600 mb-8">Your order will be waiting for you.</p>
//             <div className="flex justify-start">
//               <button
//                 onClick={handleReset}
//                 className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
//               >
//                 Return to start
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//   }

//   if (step === 'payment') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
//         <div className="max-w-4xl mx-auto">
//           <button
//             onClick={onBack}
//             className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-8"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back to Menu
//           </button>

//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-slate-800 mb-6">Payment Summary</h2>
            
//             <div className="space-y-4 mb-8">
//               <div className="flex justify-between">
//                 <span className="text-slate-600">Delivery Station:</span>
//                 <span className="text-slate-800">{selectedStation}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-600">Selected Item:</span>
//                 <span className="text-slate-800">
//                   {coffeeOptions.find(c => c.id === selectedCoffee)?.id}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-600">Total:</span>
//                 <span className="text-slate-800">€4.50</span>
//               </div>
//             </div>

//             <div className="flex justify-between gap-4">
//               <button
//                 onClick={handlePayment}
//                 className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors"
//               >
//                 Pay Now
//               </button>
//               <button
//                 onClick={() => setStep('coffee')}
//                 className="bg-slate-300 hover:bg-slate-400 text-slate-700 px-8 py-3 rounded-lg transition-colors"
//               >
//                 Go Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (step === 'coffee') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
//         <div className="max-w-4xl mx-auto">
//           <button
//             onClick={onBack}
//             className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-8"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back to Menu
//           </button>

//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-slate-800 mb-2">Select Your Beverage Configuration</h2>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
//               {coffeeOptions.map((option) => {
//                 const Icon = option.icon;
//                 return (
//                   <button
//                     key={option.id}
//                     onClick={() => handleCoffeeSelect(option.id)}
//                     className="bg-slate-50 hover:bg-slate-100 p-6 rounded-xl transition-colors flex flex-col items-center gap-3"
//                   >
//                     <Icon className="w-12 h-12 text-amber-600" />
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="flex justify-center">
//               <button
//                 onClick={handleContinueFromCoffee}
//                 className={`px-8 py-3 rounded-lg transition-colors ${
//                   selectedCoffee 
//                     ? 'bg-amber-600 hover:bg-amber-700 text-white' 
//                     : 'bg-slate-200 text-slate-400 cursor-not-allowed'
//                 }`}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Station selection (default)
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-8"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Back to Menu
//         </button>

//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           <h2 className="text-slate-800 mb-2">Coffee Delivery Service</h2>
          
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
//             {stations.map((station) => (
//               <button
//                 key={station}
//                 onClick={() => handleStationSelect(station)}
//                 className="bg-slate-50 hover:bg-slate-100 p-4 rounded-lg text-left transition-colors"
//               >
//                 <span className="text-slate-700">{station}</span>
//               </button>
//             ))}
//           </div>

//           <div className="flex justify-end">
//             <button
//               onClick={handleContinueFromStation}
//               className={`px-8 py-3 rounded-lg transition-colors ${
//                 selectedStation 
//                   ? 'bg-amber-600 hover:bg-amber-700 text-white' 
//                   : 'bg-slate-200 text-slate-400 cursor-not-allowed'
//               }`}
//             >
//               Next Step
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
