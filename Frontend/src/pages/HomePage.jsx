import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useCounter, useInView } from '../hooks';
import { fetchFeaturedProperties } from '../store/slices/propertySlice';
import PropertyCard from '../components/ui/PropertyCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import API from '../api/axios';

import SEO from '../components/ui/SEO';

/* ─── Stats Counter ─── */
function StatItem({ end, label, duration = 2000 }) {
  const { ref, inView } = useInView(0.3);
  const count = useCounter(end, duration, 0, inView);
  return (
    <div ref={ref} className="p-4 text-center">
      <h3 className="text-4xl md:text-5xl font-extrabold text-amber-600 mb-2 tabular-nums">{count}+</h3>
      <p className="text-gray-500 font-semibold text-sm uppercase tracking-widest">{label}</p>
    </div>
  );
}

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { featuredProperties, featuredLoading } = useAppSelector((state) => state.property);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    dispatch(fetchFeaturedProperties());
    API.get('/testimonials')
      .then(({ data }) => setTestimonials(data.testimonials || []))
      .catch(() => setTestimonials([]));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      <SEO title="Home" description="Build your dream on solid ground with our premium land development." />
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[680px] h-[100svh] max-h-[900px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Premium Real Estate"
            className="w-full h-full object-cover animate-slow-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-gray-950/30" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <span className="inline-block py-1 px-4 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold tracking-[0.2em] mb-6 border border-amber-500/30 backdrop-blur-sm animate-fade-in-up animation-fill-both animation-delay-200">
            ✦ PREMIUM LAND DEVELOPMENT
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up animation-fill-both animation-delay-400"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Build Your Dream on <br className="hidden sm:block" />
            <span className="text-gradient-amber">Solid Ground</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-fill-both animation-delay-600">
            Discover prime residential, commercial, and agricultural properties tailored for exceptional returns and a beautiful future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-fill-both animation-delay-800">
            <Link to="/properties" className="btn-primary text-lg px-8 py-4">
              Explore Properties
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link to="/contact" className="glass btn-outline border-white/30 text-white hover:bg-white/20 hover:text-white text-lg px-8 py-4">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-white/50">
          <span className="text-[10px] tracking-[0.3em] uppercase mb-2">Scroll</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="relative z-20 -mt-8 mx-4 sm:mx-8 md:mx-auto max-w-5xl">
        <div className="bg-white rounded-2xl shadow-card-hover overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <StatItem end={150} label="Completed Projects" duration={1800} />
            <StatItem end={500} label="Happy Clients" duration={2000} />
            <StatItem end={15} label="Years Experience" duration={1500} />
          </div>
        </div>
      </section>

      {/* ─── Featured Properties ─── */}
      <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-2 block">Our Portfolio</span>
          <h2 className="section-heading mb-4">Exclusive Properties</h2>
          <div className="gradient-divider" />
          <p className="section-subheading max-w-2xl mx-auto mt-4">
            Handpicked premium locations with guaranteed appreciation and ready-to-build infrastructure.
          </p>
        </div>

        {featuredLoading ? (
          <LoadingSkeleton count={3} />
        ) : featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-lg">No featured properties at the moment. Check back soon!</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/properties" className="btn-outline">
            View All Properties
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="py-28 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-400" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-2 block">Our Advantage</span>
              <h2 className="section-heading text-white mb-6">Why Invest With LandPromoters?</h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                We don't just sell land — we deliver legally verified, documented, and strategically located properties that guarantee peace of mind and high returns.
              </p>
              <div className="space-y-6">
                {[
                  { title: '100% Clear Title', desc: 'Every property undergoes rigorous legal scrutiny before listing. Zero encumbrances, zero worries.' },
                  { title: 'Prime Locations', desc: 'Strategically chosen areas with proven high growth potential and excellent infrastructure.' },
                  { title: 'Hassle-free Registration', desc: 'End-to-end support for documentation, legal vetting, and registration — we handle it all.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/40 transition-colors">
                      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/services" className="btn-primary">
                  View Our Services
                </Link>
              </div>
            </div>

            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/20 group">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Investment"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-28 bg-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-64 h-64 bg-amber-200 rounded-full filter blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-2 block">Client Stories</span>
            <h2 className="section-heading mb-4">What Our Clients Say</h2>
            <div className="gradient-divider" />
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x hide-scrollbar">
            {testimonials.map((t) => (
              <div key={t._id} className="snap-center">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
            {testimonials.length === 0 && (
              <p className="w-full text-center text-gray-500">Client testimonials will appear here soon.</p>
            )}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 rounded-3xl p-10 md:p-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30" />
            <span className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-4 block relative z-10">
              Ready to Invest?
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Find Your Perfect Property Today
            </h2>
            <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto relative z-10">
              Get in touch with our real estate experts. We'll help you navigate the market and find exactly what you're looking for.
            </p>
            <Link to="/contact" className="btn-primary text-lg px-10 py-4 relative z-10">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
