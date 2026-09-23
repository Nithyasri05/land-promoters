import { Component } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here (e.g. Sentry)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <SEO title="Something went wrong" noindex={true} />
          <div className="text-center max-w-lg bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong.</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We're sorry, but an unexpected error occurred. Our team has been notified and is working on it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-colors"
              >
                Refresh Page
              </button>
              <Link to="/" onClick={() => this.setState({ hasError: false })} className="px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold rounded-xl transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
