import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addToast } from '../../store/slices/uiSlice';
import API from '../../api/axios';

export default function AdminTestimonialForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', message: '', rating: '5' });

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await API.post('/admin/testimonials', { ...formData, rating: Number(formData.rating) });
      dispatch(addToast({ type: 'success', message: 'Testimonial published successfully' }));
      navigate('/admin/testimonials');
    } catch (error) {
      dispatch(addToast({ type: 'error', message: error.response?.data?.message || 'Failed to publish testimonial' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/testimonials" className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-xl border border-gray-200">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Testimonial</h1>
          <p className="text-sm text-gray-500">Publish a testimonial on the client website.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
            <input id="name" name="name" value={formData.name} onChange={handleChange} required maxLength="100" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <input id="role" name="role" value={formData.role} onChange={handleChange} maxLength="100" placeholder="Home Buyer" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
          <select id="rating" name="rating" value={formData.rating} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500">
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Testimonial *</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required maxLength="1000" rows="6" placeholder="Write the client testimonial..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 resize-none" />
        </div>

        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={loading} className="px-7 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl disabled:opacity-60">
            {loading ? 'Publishing...' : 'Publish Testimonial'}
          </button>
          <Link to="/admin/testimonials" className="px-7 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
