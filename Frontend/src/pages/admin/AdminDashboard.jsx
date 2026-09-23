import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import API from '../../api/axios';


export default function AdminDashboard() {
  const { isAuthenticated, admin } = useAppSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalMessages: 0,
    totalTestimonials: 0,
    recentMessages: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await API.get('/admin/stats');
      if (res.data.success) {
        const s = res.data.stats;
        setStats({
          totalProperties: s.totalProperties || 0,
          totalMessages: s.totalMessages || 0,
          totalTestimonials: s.totalTestimonials || 0,
          recentMessages: s.recentMessages || [],
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Admin 👋</h1>
        <p className="text-gray-500">Here's what's happening with your properties today.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse h-32" />
          ))}
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-amber-200 hover:shadow-md transition-all">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Properties</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalProperties}</h3>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 hover:shadow-md transition-all">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Inquiries</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalMessages}</h3>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 hover:shadow-md transition-all">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Testimonials</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalTestimonials}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514" />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Messages */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Recent Inquiries</h3>
                  <Link to="/admin/messages" className="text-sm font-medium text-amber-600 hover:text-amber-800">View All</Link>
                </div>
                <div className="divide-y divide-gray-50">
                  {stats.recentMessages && stats.recentMessages.length > 0 ? (
                    stats.recentMessages.map((msg) => (
                      <div key={msg._id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h4 className="font-semibold text-gray-900">{msg.name}</h4>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-amber-700 font-medium mb-2">{msg.subject}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{msg.feedback}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No recent inquiries found.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6 space-y-4">
                  <Link to="/admin/properties/new" className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-amber-500 hover:bg-amber-50 transition-colors group text-left">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Add Property</h4>
                      <p className="text-xs text-gray-500">Create a new listing</p>
                    </div>
                  </Link>

                  <Link to="/admin/testimonials/new" className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-amber-500 hover:bg-amber-50 transition-colors group text-left">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Add Testimonial</h4>
                      <p className="text-xs text-gray-500">Publish a new review</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
