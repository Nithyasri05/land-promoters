import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../../hooks';
import logo from '../../assets/logo.png';

const navLinks = [
  { path: '/', title: 'Home' },
  { path: '/properties', title: 'Properties' },
  { path: '/services', title: 'Services' },
  { path: '/about', title: 'About' },
  { path: '/contact', title: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const location = useLocation();

  // Only show transparent navbar on homepage when at top of page
  const isHomePage = location.pathname === '/';
  const isScrolled = scrollY > 50;
  const isTransparent = isHomePage && !isScrolled;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent py-4'
          : 'bg-white/95 backdrop-blur-md shadow-lg py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <img
              src={logo}
              alt="LandPromoters Logo"
              className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <div className="hidden sm:block">
              <h1 className={`text-lg font-bold transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-amber-900'
              }`}>
                LandPromoters
              </h1>
              <p className={`text-[10px] uppercase tracking-[0.2em] -mt-1 transition-colors duration-300 ${
                isTransparent ? 'text-amber-200' : 'text-amber-600'
              }`}>
                Premium Land Development
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium no-underline rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? isTransparent
                      ? 'text-white bg-white/20'
                      : 'text-amber-800 bg-amber-50'
                    : isTransparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-amber-800 hover:bg-amber-50'
                }`}
              >
                {link.title}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-amber-500 rounded-full" />
                )}
              </Link>
            ))}
            <Link
              to="/admin"
              className={`ml-3 px-5 py-2.5 text-sm font-semibold no-underline rounded-lg transition-all duration-300 ${
                isTransparent
                  ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
                  : 'bg-amber-800 text-white hover:bg-amber-900 shadow-lg shadow-amber-800/25'
              }`}
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-[80px] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-[80px] right-0 w-72 h-[calc(100vh-80px)] bg-white shadow-2xl transition-transform duration-500 ease-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-xl text-sm font-medium no-underline transition-all duration-200 ${
                location.pathname === link.path
                  ? 'bg-amber-50 text-amber-800 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.title}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 mt-4">
            <Link
              to="/admin"
              className="block px-4 py-3 bg-amber-800 text-white text-center rounded-xl font-semibold no-underline hover:bg-amber-900 transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
