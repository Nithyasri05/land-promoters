import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addToast } from '../../store/slices/uiSlice';
import API from '../../api/axios';
import AdminConfirmModal from '../../components/admin/AdminConfirmModal';

export default function AdminTestimonials() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTestimonials();
    }
  }, [isAuthenticated]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await API.get('/admin/testimonials');
      if (res.data.success) {
        setTestimonials(res.data.testimonials || []);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      dispatch(addToast({ type: 'error', message: 'Failed to load testimonials' }));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    try {
      await API.delete(`/admin/testimonials/${id}`);
      dispatch(addToast({ type: 'success', message: 'Testimonial deleted successfully' }));
      fetchTestimonials();
    } catch (error) {
      dispatch(addToast({ type: 'error', message: 'Failed to delete testimonial' }));
    } finally {
      setDeleteId(null);
      setDeleteTarget(null);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Testimonials Management</h1>
          <p className="text-gray-500 text-sm">View, edit, and manage client testimonials.</p>
        </div>
        <Link 
          to="/admin/testimonials/new" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-amber-600/20 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Testimonial
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Client Info</th>
                <th className="px-6 py-4 font-medium">Message</th>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading testimonials...
                    </div>
                  </td>
                </tr>
              ) : testimonials.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    No testimonials found. Click "Add Testimonial" to create one.
                  </td>
                </tr>
              ) : (
                testimonials.map((testimonial) => (
                  <tr key={testimonial._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                          {testimonial.image ? (
                            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold bg-amber-100 text-amber-700">
                              {testimonial.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 mb-0.5">{testimonial.name}</p>
                          <p className="text-xs text-gray-500">{testimonial.role || 'Client'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 line-clamp-2 max-w-md">{testimonial.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-amber-400">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${testimonial.isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                        {testimonial.isApproved ? 'Visible on website' : 'Pending approval'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => setDeleteTarget(testimonial)}
                        disabled={deleteId === testimonial._id}
                        className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Delete Testimonial"
                      >
                        {deleteId === testimonial._id ? (
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
        title="Delete this testimonial?"
        message="This testimonial will be permanently removed from the admin and client website."
        loading={Boolean(deleteId)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => handleDelete(deleteTarget._id)}
      />
    </>
  );
}
