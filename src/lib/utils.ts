/**
 * Format a numeric price into a currency string (e.g. 10.88 -> "$10.88")
 */
export function formatCurrency(amount: number, currencySymbol: string = "$"): string {
  return `${currencySymbol}${amount.toFixed(2)}`;
}

/**
 * Truncate text to a given max length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
