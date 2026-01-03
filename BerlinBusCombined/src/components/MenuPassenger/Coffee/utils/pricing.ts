export function calculatePriceBySize(basePrice: number, size: string): number {
  switch (size.toLowerCase()) {
    case 'small':
    case 's':
      return basePrice;
    case 'medium':
    case 'm':
      return basePrice + 1;
    case 'large':
    case 'l':
      return basePrice + 2;
    default:
      return basePrice;
  }
}
