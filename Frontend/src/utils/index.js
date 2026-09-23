/**
 * Format price in Indian currency format
 */
export function formatPrice(price) {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * Format area with sqft suffix
 */
export function formatArea(area) {
  if (area >= 43560) {
    return `${(area / 43560).toFixed(2)} Acres`;
  }
  return `${area.toLocaleString('en-IN')} sqft`;
}

/**
 * Format date to readable string
 */
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get status badge color classes
 */
export function getStatusColor(status) {
  switch (status) {
    case 'Available':
      return 'bg-emerald-100 text-emerald-800';
    case 'Sold':
      return 'bg-red-100 text-red-800';
    case 'Upcoming':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
