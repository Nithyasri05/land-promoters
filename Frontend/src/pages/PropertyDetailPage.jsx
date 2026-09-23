import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchPropertyBySlug, clearCurrentProperty } from '../store/slices/propertySlice';
import { formatPrice, formatArea, getStatusColor } from '../utils';
import SEO from '../components/ui/SEO';

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { currentProperty, detailLoading, error } = useAppSelector((state) => state.property);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (slug) {
      dispatch(fetchPropertyBySlug(slug));
    }
    return () => {
      dispatch(clearCurrentProperty());
    };
  }, [dispatch, slug]);

  if (detailLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error || !currentProperty) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-sm border border-gray-100 max-w-lg w-full">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-500 mb-8">{error || "The property you're looking for doesn't exist or has been removed."}</p>
          <Link to="/properties" className="inline-block px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-amber-600/20">
            Browse All Properties
          </Link>
        </div>
      </div>
    );
  }

  const p = currentProperty;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEO title={p.title} description={p.description} image={p.images?.[0]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li><Link to="/" className="hover:text-amber-600 transition-colors">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link to="/properties" className="hover:text-amber-600 transition-colors">Properties</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
              {p.title}
            </li>
          </ol>
        </nav>

        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(p.status)}`}>
                {p.status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                {p.propertyType}
              </span>
              {p.isFeatured && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  ★ Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
              {p.title}
            </h1>
            <p className="text-lg text-gray-500 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {p.location.address}, {p.location.city}, {p.location.state} {p.location.pincode && `- ${p.location.pincode}`}
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Asking Price</p>
            <p className="text-4xl md:text-5xl font-extrabold text-amber-700">{formatPrice(p.price)}</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-12">
          {p.images && p.images.length > 0 ? (
            <div className="space-y-4">
              <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden group">
                <img 
                  src={p.images[activeImage]} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {p.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative h-20 md:h-24 rounded-xl overflow-hidden ${
                      activeImage === idx ? 'ring-4 ring-amber-500 ring-offset-2' : 'opacity-70 hover:opacity-100'
                    } transition-all`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[400px] md:h-[600px] bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl flex flex-col items-center justify-center">
              <svg className="w-24 h-24 text-amber-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-amber-700 font-medium text-lg">No Images Available</p>
            </div>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                <div className="bg-amber-50 rounded-2xl p-4 text-center">
                  <span className="block text-gray-500 text-sm mb-1">Area</span>
                  <span className="block font-bold text-gray-900 text-lg">{formatArea(p.area)}</span>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 text-center">
                  <span className="block text-gray-500 text-sm mb-1">Dimensions</span>
                  <span className="block font-bold text-gray-900 text-lg">{p.dimensions || 'N/A'}</span>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 text-center">
                  <span className="block text-gray-500 text-sm mb-1">Type</span>
                  <span className="block font-bold text-gray-900 text-lg">{p.propertyType}</span>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 text-center">
                  <span className="block text-gray-500 text-sm mb-1">Status</span>
                  <span className="block font-bold text-gray-900 text-lg">{p.status}</span>
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-gray-900 mb-4">Description</h4>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {p.description}
              </p>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Features & Amenities</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-amber-700 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    {p.features && p.features.length > 0 ? (
                      p.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                          {feat}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 italic">No features listed</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-amber-700 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Amenities
                  </h4>
                  <ul className="space-y-3">
                    {p.amenities && p.amenities.length > 0 ? (
                      p.amenities.map((amenity, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                          {amenity}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 italic">No amenities listed</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Map Placeholder (If link exists) */}
            {p.location.mapLink && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Location Map</h3>
                <div className="w-full h-[300px] bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200">
                   <a 
                    href={p.location.mapLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                   >
                     <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                     Open in Google Maps
                   </a>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Contact Agent */}
          <div className="lg:col-span-1 sticky top-24 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-amber-100">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interested in this property?</h3>
              <p className="text-gray-500 text-sm mb-6">Contact our experts for a site visit, legal documents, or pricing details.</p>
              
              <div className="space-y-3 mb-8">
                <a href="tel:+919876542310" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-gray-900/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                <Link to="/contact" state={{ property: p.title }} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Inquiry
                </Link>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center uppercase tracking-widest font-semibold mb-3">Share Property</p>
                <div className="flex justify-center gap-4">
                  {['facebook', 'twitter', 'whatsapp'].map((social) => (
                    <button key={social} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-amber-100 hover:text-amber-600 transition-colors text-gray-400">
                      <span className="text-sm font-bold capitalize">{social.charAt(0)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
