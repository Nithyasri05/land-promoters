import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearCurrentProperty, fetchPropertyBySlug } from '../../store/slices/propertySlice';
import { getStatusColor } from '../../utils';

export default function AdminPropertyPreview() {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { currentProperty, detailLoading, error } = useAppSelector((state) => state.property);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (slug && isAuthenticated) {
      dispatch(fetchPropertyBySlug(slug));
    }

    return () => {
      dispatch(clearCurrentProperty());
    };
  }, [dispatch, isAuthenticated, slug]);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  if (detailLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !currentProperty) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Property Preview Unavailable</h1>
        <p className="text-gray-500 mb-6">{error || 'This property could not be found.'}</p>
        <Link to="/admin/properties" className="inline-flex px-5 py-3 bg-amber-600 text-white font-semibold rounded-xl">
          Back to Properties
        </Link>
      </div>
    );
  }

  const property = currentProperty;
  const images = property.images || [];
  const location = property.location || {};

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link to="/admin/properties" className="text-sm text-amber-700 hover:text-amber-800 font-medium">
            Properties
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Property Preview</h1>
          <p className="text-gray-500 text-sm">Preview the details of this property</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to={`/admin/properties/${property.slug}/edit`} className="inline-flex items-center gap-2 justify-center px-5 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 013 3L12 14l-4 1 1-4 7.5-7.5z" />
            </svg>
            Edit Property
          </Link>
          <Link to="/admin/properties" className="inline-flex justify-center px-5 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300">
            Back to list
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 p-6 md:p-8">
          <div>
            <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
              {images.length > 0 ? (
                <img src={images[activeImage]} alt={property.title} className="w-full h-full object-cover" />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">No images uploaded</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3 mt-3">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden ${activeImage === index ? 'ring-2 ring-amber-500' : 'opacity-70 hover:opacity-100'}`}
                    aria-label={`Show image ${index + 1}`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(property.status)}`}>
                {property.status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-100 text-amber-800">
                {property.propertyType}
              </span>
              {property.isFeatured && <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-gray-900 text-white">Featured</span>}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{property.title}</h2>
            <p className="text-gray-500 mb-6">{location.address}, {location.city}, {location.state} {location.pincode && `- ${location.pincode}`}</p>
            <p className="text-3xl font-extrabold text-amber-700 mb-8">₹{Number(property.price || 0).toLocaleString('en-IN')}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4"><p className="text-xs text-gray-500">Area</p><p className="font-bold text-gray-900">{property.area || 'N/A'}</p></div>
              <div className="bg-gray-50 rounded-xl p-4"><p className="text-xs text-gray-500">Dimensions</p><p className="font-bold text-gray-900">{property.dimensions || 'N/A'}</p></div>
            </div>

            <h3 className="font-bold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description || 'No description provided.'}</p>
          </div>
        </div>

        <div className="border-t border-gray-100 grid md:grid-cols-2 gap-8 p-6 md:p-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              {property.features?.length ? property.features.map((feature) => <li key={feature}>• {feature}</li>) : <li>No features listed.</li>}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Amenities</h3>
            <ul className="space-y-2 text-gray-600">
              {property.amenities?.length ? property.amenities.map((amenity) => <li key={amenity}>• {amenity}</li>) : <li>No amenities listed.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
