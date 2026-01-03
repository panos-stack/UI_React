export interface CoffeeShop {
  id: string;
  name: string;
  logo: string;
  rating: number;
  deliveryTime: string;
  image: string;
}

export interface Drink {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
}

export interface BusStop {
  id: string;
  name: string;
  route: string;
  estimatedArrival: string;
  distance: string;
}

export interface CartItem {
  drink: Drink;
  size: string;
  quantity: number;
  shop: CoffeeShop;
  price: number; // Size-adjusted price
}

export interface PaymentCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  type: 'visa' | 'mastercard' | 'amex';
}