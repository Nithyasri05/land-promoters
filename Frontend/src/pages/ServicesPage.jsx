import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';

const services = [
  {
    title: 'Residential Plots',
    description: 'Build your dream home in safe, secure, and thriving neighborhoods. We offer premium residential plots with clear titles and modern amenities.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    features: ['DTCP/RERA Approved', 'Gated Communities', 'Ready for Construction', 'Bank Loan Assistance']
  },
  {
    title: 'Commercial Lands',
    description: 'Strategic locations for your business. High-visibility plots on arterial roads perfect for showrooms, offices, and retail spaces.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    features: ['High Footfall Areas', 'Main Road Frontage', 'Clear Commercial Zoning', 'High ROI Potential']
  },
  {
    title: 'Agricultural & Farm Lands',
    description: 'Invest in fertile agricultural lands or build your weekend getaway farmhouse in scenic, unpolluted environments.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    features: ['Fertile Soil', 'Water Facilities', 'Fenced Boundaries', 'Scenic Locations']
  },
  {
    title: 'Legal Verification',
    description: 'Complete peace of mind with our rigorous legal vetting process. We ensure every property is free from encumbrances.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    features: ['Title Verification', 'Encumbrance Check', 'Document Drafting', 'Registration Support']
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEO title="Our Services" description="Comprehensive real estate services including residential plots, commercial lands, agricultural lands, and legal verification." />
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm mb-2 block">What We Do</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Comprehensive Real Estate Services</h1>
        <p className="text-gray-600 text-lg">
          From finding the perfect plot to handing over the registered documents, we offer end-to-end solutions for all your real estate needs.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="bg-amber-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need a specialized service?</h2>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
            We also handle joint ventures, bulk land acquisitions, and property management. Contact our team to discuss your specific requirements.
          </p>
          <Link to="/contact" className="inline-block px-10 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-colors shadow-lg shadow-gray-900/20">
            Talk to an Expert
          </Link>
        </div>
      </section>

    </div>
  );
}
