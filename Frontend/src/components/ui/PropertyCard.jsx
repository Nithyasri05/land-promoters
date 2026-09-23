import { Link } from 'react-router-dom';
import { formatPrice, formatArea, getStatusColor, truncate } from '../../utils';

export default function PropertyCard({ property }) {
  const statusClasses = getStatusColor(property.status);

  return (
    <Link
      to={`/properties/${property.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 no-underline"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-amber-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-amber-600 text-sm font-medium">{property.propertyType}</span>
            </div>
          </div>
        )}

        {/* Status badge */}
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusClasses}`}>
          {property.status}
        </span>

        {/* Featured badge */}
        {property.isFeatured && (
          <span className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            ★ Featured
          </span>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
            {property.propertyType}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-amber-800 transition-colors line-clamp-1">
          {property.title}
        </h3>

        <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location.city}, {property.location.state}
        </p>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {truncate(property.description, 100)}
        </p>

        {/* Price & Area */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Price</p>
            <p className="text-xl font-bold text-amber-800">{formatPrice(property.price)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Area</p>
            <p className="text-lg font-semibold text-gray-700">{formatArea(property.area)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
