export default function AdminConfirmModal({ open, title, message, confirmLabel = 'Delete', onCancel, onConfirm, loading = false }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-gray-950/60 px-4" role="dialog" aria-modal="true" aria-labelledby="delete-confirmation-title">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v3m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0l-6.93 12c-.77 1.33.19 3 1.73 3z" />
          </svg>
        </div>
        <h2 id="delete-confirmation-title" className="text-center text-xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-center text-sm leading-relaxed text-gray-500">{message}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={onCancel} disabled={loading} className="rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-60">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} disabled={loading} className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60">
            {loading ? 'Deleting...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
