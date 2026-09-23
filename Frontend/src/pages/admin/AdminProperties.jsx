import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProperties } from '../../store/slices/propertySlice';
import { addToast } from '../../store/slices/uiSlice';
import API from '../../api/axios';
import AdminConfirmModal from '../../components/admin/AdminConfirmModal';

export default function AdminProperties() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { properties, loading } = useAppSelector((state) => state.property);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProperties({ limit: 1000, sort: 'newest' }));
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleDelete = async (id) => {
    setDeleteId(id);
    try {
      await API.delete(`/admin/properties/${id}`);
      dispatch(addToast({ type: 'success', message: 'Property deleted successfully' }));
      dispatch(fetchProperties({ limit: 1000, sort: 'newest' })); // Refresh list
    } catch (error) {
      dispatch(addToast({ type: 'error', message: 'Failed to delete property' }));
    } finally {
      setDeleteId(null);
      setDeleteTarget(null);
    }
  };

  const openProperty = (slug) => navigate(`/admin/properties/${slug}`);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Properties Management</h1>
          <p className="text-gray-500 text-sm">View, edit, and manage all your property listings.</p>
        </div>
        <Link 
          to="/admin/properties/new" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-amber-600/20 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Property
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Property Details</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading properties...
                    </div>
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No properties found. Click "Add Property" to create one.
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr
                    key={property._id}
                    onClick={() => openProperty(property.slug)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openProperty(property.slug);
                      }
                    }}
                    role="link"
                    tabIndex={0}
                    className="cursor-pointer hover:bg-gray-50/50 focus-visible:bg-gray-50 focus-visible:outline-none transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                          {property.images && property.images.length > 0 ? (
                            <img src={property.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 mb-1 max-w-[200px] sm:max-w-[300px] truncate">
                            {property.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{property.location.city}, {property.location.state}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {property.propertyType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
                        ${property.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : ''}
                        ${property.status === 'Sold' ? 'bg-red-100 text-red-800' : ''}
                        ${property.status === 'Upcoming' ? 'bg-amber-100 text-amber-800' : ''}
                      `}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      ₹{property.price.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link 
                        to={`/admin/properties/${property.slug}`}
                        onClick={(event) => event.stopPropagation()}
                        className="text-gray-400 hover:text-amber-600 transition-colors"
                        title="Preview Property"
                        aria-label={`Preview ${property.title}`}
                      >
                        <svg className="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <button 
                        onClick={(event) => {
                          event.stopPropagation();
                          setDeleteTarget(property);
                        }}
                        disabled={deleteId === property._id}
                        className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Delete Property"
                      >
                        {deleteId === property._id ? (
                          <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin inline-block"></div>
                        ) : (
                          <svg className="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AdminConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete this property?"
        message="This action cannot be undone. The property will be removed from the admin and client listings."
        loading={Boolean(deleteId)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => handleDelete(deleteTarget._id)}
      />
    </>
  );
}
