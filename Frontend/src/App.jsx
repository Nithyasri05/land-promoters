import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import Toast from './components/ui/Toast';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProperties from './pages/admin/AdminProperties';
import AdminPropertyForm from './pages/admin/AdminPropertyForm';
import AdminPropertyPreview from './pages/admin/AdminPropertyPreview';
import AdminMessages from './pages/admin/AdminMessages';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminTestimonialForm from './pages/admin/AdminTestimonialForm';
import AdminLayout from './components/admin/AdminLayout';
import NotFoundPage from './pages/NotFoundPage';

// Lazy loaded pages (to be created)
const HomePage = lazy(() => import('./pages/HomePage'));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));



function App() {
  return (
    <>
      <ScrollToTop />
      <Toast />
      <Routes>
        {/* Admin Routes (No Navbar/Footer layout) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/properties" element={<AdminProperties />} />
          <Route path="/admin/properties/new" element={<AdminPropertyForm />} />
          <Route path="/admin/properties/:slug" element={<AdminPropertyPreview />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/testimonials/new" element={<AdminTestimonialForm />} />
        </Route>

        {/* Public Routes with Layout */}
        <Route
          path="*"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Suspense
                  fallback={
                    <div className="pt-24 pb-12 min-h-[60vh] flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/properties" element={<PropertiesPage />} />
                    <Route path="/properties/:slug" element={<PropertyDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
