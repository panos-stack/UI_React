import { CoffeeShop, Drink, BusStop, PaymentCard, Restaurant } from '../types';
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
    name: 'Brandenburg Gate',
    route: 'Route 42, 55, 78',
    estimatedArrival: '5 min',
    distance: '0.3 miles',
    position: [52.5163, 13.3777],
    arrivalTime: "10:00 AM",
  },
  {
    id: '2',
    name: 'TV Tower',
    route: 'Route 12, 42, 91',
    estimatedArrival: '12 min',
    distance: '0.8 miles',
    position: [52.5208, 13.4094],
    arrivalTime: "10:20 AM",
  },
  {
    id: '3',
    name: 'Berlin Cathedral',
    route: 'Route 22, 55',
    estimatedArrival: '8 min',
    distance: '0.5 miles',
    position: [52.5191, 13.4013], 
    arrivalTime: "10:40 AM",
  },
  {
    id: '4',
    name: 'Reinstag',
    route: 'Route 78, 91',
    estimatedArrival: '7 min',
    distance: '1.2 miles',
    position: [52.5186, 13.3762],
    arrivalTime: "11:00 AM",
  },
];

export const restaurants: Restaurant[] = [
  { 
    id: 1, 
    name: "Berliner Küche", 
    cuisine: "German", 
    position: [52.5170, 13.3800], 
    rating: 4.5, 
    distance: "50m from Brandenburg Gate" 
  },
  { 
    id: 2, 
    name: "Bella Italia", 
    cuisine: "Italian", 
    position: [52.5200, 13.4080], 
    rating: 4.3, 
    distance: "100m from TV Tower" 
  },
  { 
    id: 3, 
    name: "Curry 36", 
    cuisine: "Fast Food", 
    position: [52.5195, 13.4020], 
    rating: 4.7, 
    distance: "80m from Cathedral" 
  },
  { 
    id: 4, 
    name: "Hauptstadt Café", 
    cuisine: "Café", 
    position: [52.5180, 13.3770], 
    rating: 4.6, 
    distance: "70m from Reichstag" 
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
