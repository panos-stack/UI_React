import { CoffeeShop, Drink, BusStop, PaymentCard } from '../types';
import Brew_Haven from './images/Brew_Haven.jpg';
import City_Roasters from './images/City_Roasters.webp';
import Express_Coffee_Co from './images/Express_Coffee_Co.jpg';
import The_Daily_Grind from './images/The_Daily_Grind.jpg';
import Latte from './images/Latte.jpg';
import Cappuccino from './images/Cappuccino.jpg';
import Espresso from './images/Espresso.jpg';
import Americano from './images/Americano.jpg';
import Mocha from './images/Mocha.webp';
import Iced_Latte from './images/Iced_Latte.jpg';
import Cold_Brew from './images/Cold_Brew.jpg';
import Flat_White from './images/Flat_White.jpg';
import Freedo_Espresso from './images/Freedo_Espresso.webp';

export const coffeeShops: CoffeeShop[] = [
  {
    id: '1',
    name: 'Brew Haven',
    logo: '☕',
    rating: 4.8,
    deliveryTime: '10-15 min',
    image: Brew_Haven,
  },
  {
    id: '2',
    name: 'City Roasters',
    logo: '🏙️',
    rating: 4.6,
    deliveryTime: '12-18 min',
    image: City_Roasters,
  },
  {
    id: '3',
    name: 'Express Coffee Co.',
    logo: '⚡',
    rating: 4.9,
    deliveryTime: '8-12 min',
    image: Express_Coffee_Co,
  },
  {
    id: '4',
    name: 'The Daily Grind',
    logo: '☀️',
    rating: 4.7,
    deliveryTime: '10-15 min',
    image: The_Daily_Grind,
  },
];

export const drinks: Drink[] = [
  {
    id: '1',
    name: 'Caffe Latte',
    description: 'Rich espresso with steamed milk and a light layer of foam',
    price: 4.50,
    image: Latte,
    category: 'Hot Coffee',
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'Espresso with equal parts steamed milk and foam',
    price: 4.25,
    image: Cappuccino,
    category: 'Hot Coffee',
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    id: '3',
    name: 'Espresso',
    description: 'Strong and bold shot of pure coffee',
    price: 3.00,
    image: Espresso,
    category: 'Hot Coffee',
    sizes: ['Single', 'Double'],
  },
  {
    id: '4',
    name: 'Americano',
    description: 'Espresso diluted with hot water for a smooth taste',
    price: 3.75,
    image: Americano,
    category: 'Hot Coffee',
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    id: '5',
    name: 'Mocha',
    description: 'Espresso with chocolate syrup and steamed milk',
    price: 5.00,
    image: Mocha,
    category: 'Hot Coffee',
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    id: '6',
    name: 'Iced Latte',
    description: 'Chilled espresso with cold milk over ice',
    price: 4.75,
    image: Iced_Latte,
    category: 'Cold Coffee',
    sizes: ['Small','Medium', 'Large'],
  },
  {
    id: '7',
    name: 'Cold Brew',
    description: 'Smooth, slow-steeped coffee served over ice',
    price: 4.50,
    image: Cold_Brew,
    category: 'Cold Coffee',
    sizes: ['Small','Medium', 'Large'],
  },
  {
    id: '8',
    name: 'Flat White',
    description: 'Velvety microfoam over espresso',
    price: 4.50,
    image: Flat_White,
    category: 'Hot Coffee',
    sizes: ['Small', 'Medium'],
  },
  {
    id: '9',
    name: 'Freedo Espresso',
    description: 'Strong and bold espresso',
    price: 2.50,
    image: Freedo_Espresso,
    category: 'Cold Coffee',
    sizes: ['Small', 'Medium'],
  },
];

export const busStops: BusStop[] = [
  {
    id: '1',
    name: 'Central Station',
    route: 'Route 42, 55, 78',
    estimatedArrival: '5 min',
    distance: '0.3 miles',
  },
  {
    id: '2',
    name: 'City Hall Plaza',
    route: 'Route 12, 42, 91',
    estimatedArrival: '12 min',
    distance: '0.8 miles',
  },
  {
    id: '3',
    name: 'University Avenue',
    route: 'Route 22, 55',
    estimatedArrival: '8 min',
    distance: '0.5 miles',
  },
  {
    id: '4',
    name: 'Commerce Street',
    route: 'Route 78, 91',
    estimatedArrival: '15 min',
    distance: '1.2 miles',
  },
  {
    id: '5',
    name: 'Park Boulevard',
    route: 'Route 12, 22, 42',
    estimatedArrival: '10 min',
    distance: '0.7 miles',
  },
  {
    id: '6',
    name: 'Harbor Terminal',
    route: 'Route 55, 78',
    estimatedArrival: '18 min',
    distance: '1.5 miles',
  },
];

export const paymentCards: PaymentCard[] = [
  {
    id: '1',
    cardNumber: '**** **** **** 4532',
    cardHolder: 'John Doe',
    expiryDate: '12/25',
    type: 'visa',
  },
  {
    id: '2',
    cardNumber: '**** **** **** 8765',
    cardHolder: 'John Doe',
    expiryDate: '09/26',
    type: 'mastercard',
  },
  {
    id: '3',
    cardNumber: '**** ****** 1234',
    cardHolder: 'John Doe',
    expiryDate: '03/27',
    type: 'amex',
  },
];
