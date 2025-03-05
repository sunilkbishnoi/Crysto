
import { cn } from "@/lib/utils";

// Define the conversion rate in one place for consistency
const USD_TO_INR_RATE = 83.12;

export function formatCurrency(value: number, currency: string) {
  // Always handle the conversion here based on the required currency
  const convertedValue = currency === 'USD' ? value / USD_TO_INR_RATE : value;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 2,
  }).format(convertedValue);
}

export function formatPercentage(value: number) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function formatMarketCap(num: number, currency: string) {
  if (currency === 'USD') {
    // Format in millions for USD
    return `$${(num / USD_TO_INR_RATE / 1000000).toFixed(2)}M`;
  } else {
    // Format in crores for INR
    return `₹${(num / 10000000).toFixed(2)}Cr`;
  }
}

// Export the conversion rate for use in other components
export const CURRENCY_CONVERSION_RATE = USD_TO_INR_RATE;
