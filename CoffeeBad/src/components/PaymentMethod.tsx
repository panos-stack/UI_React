import { useState } from 'react';
import { CartItem, ViewMode } from '../App';
import { CreditCard, ArrowLeft, ArrowRight, Lock } from 'lucide-react';

interface PaymentMethodProps {
  cart: CartItem[];
  paymentInfo: {
    cardNumber: string;
    cardName: string;
    expiry: string;
    cvv: string;
  };
  onUpdatePayment: (info: { cardNumber: string; cardName: string; expiry: string; cvv: string }) => void;
  onNavigate: (view: ViewMode) => void;
}

export function PaymentMethod({ cart, paymentInfo, onUpdatePayment, onNavigate }: PaymentMethodProps) {
  const [cardDigits, setCardDigits] = useState<string[]>(
    paymentInfo.cardNumber ? paymentInfo.cardNumber.match(/.{1,4}/g) || ['', '', '', ''] : ['', '', '', '']
  );
  const [cardName, setCardName] = useState(paymentInfo.cardName);
  const [expiry, setExpiry] = useState(paymentInfo.expiry);
  const [cvv, setCvv] = useState(paymentInfo.cvv);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCardConfirmed, setIsCardConfirmed] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCardDigitChange = (index: number, value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 4) {
      const newDigits = [...cardDigits];
      newDigits[index] = numericValue;
      setCardDigits(newDigits);
    }
  };

  const handleExpiryChange = (value: string) => {
    // Format as MM/YY
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 4) {
      if (numericValue.length >= 2) {
        setExpiry(numericValue.slice(0, 2) + '/' + numericValue.slice(2));
      } else {
        setExpiry(numericValue);
      }
    }
  };

  const handleCvvChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 3) {
      setCvv(numericValue);
    }
  };

  const handleConfirmCard = () => {
    const fullCardNumber = cardDigits.join('');
    onUpdatePayment({
      cardNumber: fullCardNumber,
      cardName,
      expiry,
      cvv
    });
    setIsCardConfirmed(true);
  };

  const handleProceedToCheckout = () => {
    onNavigate('checkout');
  };

  const handleEditCard = () => {
    setIsCardConfirmed(false);
  };

  const isFormValid = 
    cardDigits.every(d => d.length === 4) && 
    cardName.length > 0 && 
    expiry.length === 5 && 
    cvv.length === 3;

  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-6 min-h-[600px]">
      {/* Unconventional header - diagonal stripe */}
      <div className="mb-8 relative">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 transform -skew-x-12 -mx-6 px-6 py-6 shadow-lg">
          <h1 className="text-white text-center transform skew-x-12">
            PAYMENT PORTAL
          </h1>
        </div>
        
        {/* Back button in weird spot - top right */}
        <button
          onClick={() => onNavigate('cart')}
          className="absolute -top-2 right-0 bg-yellow-300 hover:bg-yellow-400 rounded-full p-2 shadow-lg transform -rotate-45 hover:rotate-0 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-gray-600 mb-6 italic transform -rotate-1">
        Fill the floating boxes...
      </p>

      {/* Unconventional card display - 3D flip effect */}
      <div 
        className="relative mb-8 h-48 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className={`absolute w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Card Front */}
          <div 
            className="absolute w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-2xl p-6 shadow-xl backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex justify-between items-start mb-8">
              <CreditCard className="w-12 h-12 text-white/80" />
              <Lock className="w-6 h-6 text-white/80" />
            </div>
            
            <div className="mb-6">
              <div className="flex gap-2 justify-center">
                {cardDigits.map((digit, i) => (
                  <span key={i} className="text-white text-xl tracking-widest">
                    {digit || '••••'}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/70 text-xs mb-1">CARDHOLDER</p>
                <p className="text-white">{cardName || 'YOUR NAME'}</p>
              </div>
              <div>
                <p className="text-white/70 text-xs mb-1">EXPIRES</p>
                <p className="text-white">{expiry || 'MM/YY'}</p>
              </div>
            </div>
          </div>

          {/* Card Back */}
          <div 
            className="absolute w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-xl backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="bg-black h-12 mt-6"></div>
            <div className="px-6 mt-4">
              <div className="bg-white h-10 flex items-center justify-end px-4">
                <span className="text-gray-800">{cvv || '•••'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mb-6 italic">
        (Click card to flip)
      </p>

      {/* Unconventional form layout - scattered inputs */}
      <div className="space-y-6 mb-8">
        {/* Card number in 4 separate boxes */}
        <div className="transform rotate-1">
          <label className="block text-sm text-gray-700 mb-2 bg-yellow-100 inline-block px-2 py-1 rounded transform -rotate-2">
            Card Numbers (in 4 boxes)
          </label>
          <div className="flex gap-2 justify-center">
            {cardDigits.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleCardDigitChange(index, e.target.value)}
                disabled={isCardConfirmed}
                className={`w-16 h-16 text-center text-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transform hover:scale-110 transition-transform ${
                  isCardConfirmed ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                maxLength={4}
                placeholder="••••"
              />
            ))}
          </div>
        </div>

        {/* Cardholder name - tilted */}
        <div className="transform -rotate-1">
          <label className="block text-sm text-gray-700 mb-2 bg-pink-100 inline-block px-2 py-1 rounded transform rotate-2">
            Name on Card
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            disabled={isCardConfirmed}
            className={`w-full p-4 bg-gradient-to-r from-pink-50 to-red-50 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transform hover:rotate-0 transition-transform uppercase ${
              isCardConfirmed ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            placeholder="JOHN DOE"
          />
        </div>

        {/* Expiry and CVV side by side but with different rotations */}
        <div className="flex gap-4">
          <div className="flex-1 transform rotate-2">
            <label className="block text-sm text-gray-700 mb-2 bg-green-100 inline-block px-2 py-1 rounded transform -rotate-3">
              Expiry
            </label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => handleExpiryChange(e.target.value)}
              disabled={isCardConfirmed}
              className={`w-full p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transform hover:rotate-0 transition-transform ${
                isCardConfirmed ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              placeholder="MM/YY"
              maxLength={5}
            />
          </div>

          <div className="flex-1 transform -rotate-2">
            <label className="block text-sm text-gray-700 mb-2 bg-orange-100 inline-block px-2 py-1 rounded transform rotate-3">
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => handleCvvChange(e.target.value)}
              onFocus={() => !isCardConfirmed && setIsFlipped(true)}
              onBlur={() => setIsFlipped(false)}
              disabled={isCardConfirmed}
              className={`w-full p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transform hover:rotate-0 transition-transform ${
                isCardConfirmed ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              placeholder="123"
              maxLength={3}
            />
          </div>
        </div>
      </div>

      {/* Total in corner */}
      <div className="absolute top-24 right-6 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-2xl p-4 shadow-lg transform rotate-12">
        <p className="text-sm text-gray-700">Pay</p>
        <p className="text-2xl transform -rotate-12">${total.toFixed(2)}</p>
      </div>

      {/* Confirm button - only shows when form is valid and card not confirmed */}
      {!isCardConfirmed && (
        <div className="text-center">
          {isFormValid ? (
            <button
              onClick={handleConfirmCard}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full hover:scale-110 transition-all shadow-xl transform -rotate-1 hover:rotate-0 inline-flex items-center gap-3 hover:gap-5 animate-pulse hover:animate-none"
            >
              <span>Confirm Card</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          ) : (
            <p className="text-gray-400 italic transform rotate-1">
              Complete all fields to proceed...
            </p>
          )}
        </div>
      )}

      {/* Confirmed state - shows pay and edit buttons */}
      {isCardConfirmed && (
        <div className="space-y-4">
          <div className="text-center bg-green-100 border-2 border-green-400 rounded-2xl p-4 transform -rotate-1">
            <p className="text-green-700">✓ Card Confirmed!</p>
          </div>
          
          <div className="text-center">
            <button
              onClick={handleProceedToCheckout}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-full hover:scale-110 transition-all shadow-xl transform rotate-1 hover:rotate-0 inline-flex items-center gap-3 hover:gap-5 animate-pulse hover:animate-none"
            >
              <span>Proceed to Pay</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleEditCard}
              className="text-gray-600 hover:text-gray-800 underline transform rotate-1 inline-block"
            >
              Edit card details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}