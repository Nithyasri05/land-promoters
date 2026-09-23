import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addToast } from '../../store/slices/uiSlice';
import API from '../../api/axios';
import AdminConfirmModal from '../../components/admin/AdminConfirmModal';

export default function AdminMessages() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [viewMessage, setViewMessage] = useState(null);
  const [replyBody, setReplyBody] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await API.get('/admin/messages');
      if (res.data.success) {
        setMessages(res.data.msgs || []);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      dispatch(addToast({ type: 'error', message: 'Failed to load messages' }));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    try {
      await API.delete(`/admin/messages/${id}`);
      dispatch(addToast({ type: 'success', message: 'Message deleted successfully' }));
      fetchMessages();
      if (viewMessage?._id === id) setViewMessage(null);
    } catch (error) {
      dispatch(addToast({ type: 'error', message: 'Failed to delete message' }));
    } finally {
      setDeleteId(null);
      setDeleteTarget(null);
    }
  };

  const handleSelectMessage = (message) => {
    setViewMessage(message);
    setReplySubject(`Re: ${message.subject}`);
    setReplyBody('');
  };

  const handleReply = async (event) => {
    event.preventDefault();
    if (!viewMessage || !replyBody.trim()) return;

    setReplyLoading(true);
    try {
      await API.post(`/admin/messages/${viewMessage._id}/reply`, {
        replySubject,
        replyBody: replyBody.trim(),
      });
      dispatch(addToast({ type: 'success', message: 'Reply sent successfully' }));
      setReplyBody('');
    } catch (error) {
      dispatch(addToast({ type: 'error', message: error.response?.data?.message || 'Failed to send reply' }));
    } finally {
      setReplyLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Inquiries & Messages</h1>
        <p className="text-gray-500 text-sm">View messages sent from the contact form.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[360px] lg:h-[calc(100vh-200px)]">
          <div className="p-4 border-b border-gray-100 bg-gray-50 font-medium text-gray-700">
            All Messages ({messages.length})
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No messages found.</div>
            ) : (
              messages.map(msg => (
                <div 
                  key={msg._id} 
                  onClick={() => handleSelectMessage(msg)}
                  className={`p-4 cursor-pointer transition-colors ${
                    viewMessage?._id === msg._id ? 'bg-amber-50 border-l-4 border-amber-500' : 'hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900 truncate">{msg.name}</h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-amber-700 truncate mb-1">{msg.subject}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">{msg.feedback}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Viewer */}
        <div className="lg:col-span-2">
          {viewMessage ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8 min-h-[560px] lg:h-[calc(100vh-200px)] lg:min-h-0 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{viewMessage.subject}</h2>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                      {viewMessage.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{viewMessage.name}</p>
                      <a href={`mailto:${viewMessage.email}`} className="text-sm text-amber-600 hover:underline">
                        {viewMessage.email}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="text-xs sm:text-sm text-gray-500 text-right">
                    {new Date(viewMessage.createdAt).toLocaleString()}
                  </span>
                  <button 
                    onClick={() => setDeleteTarget(viewMessage)}
                    disabled={deleteId === viewMessage._id}
                    className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {deleteId === viewMessage._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 text-gray-700 whitespace-pre-wrap leading-relaxed break-words">
                  {viewMessage.feedback}
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-gray-100">
                <form onSubmit={handleReply} className="space-y-3">
                  <h3 className="font-bold text-gray-900">Reply to {viewMessage.name}</h3>
                  <input
                    type="text"
                    value={replySubject}
                    onChange={(event) => setReplySubject(event.target.value)}
                    required
                    placeholder="Subject"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <textarea
                    value={replyBody}
                    onChange={(event) => setReplyBody(event.target.value)}
                    required
                    rows="4"
                    placeholder="Write your reply..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={replyLoading || !replyBody.trim()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-60"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {replyLoading ? 'Sending...' : 'Send Reply'}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-gray-200 border-dashed min-h-[360px] lg:h-[calc(100vh-200px)] flex flex-col items-center justify-center text-gray-400">
              <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p className="text-lg font-medium">Select a message to read</p>
            </div>
          )}
        </div>

      </div>
      <AdminConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete this message?"
        message="This message and its conversation will be permanently removed from the admin panel."
        loading={Boolean(deleteId)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => handleDelete(deleteTarget._id)}
      />
    </>
  );
}
