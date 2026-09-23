import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <SEO title="About Us" description="A legacy of trust and transparency. Learn more about LandPromoters." />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 overflow-hidden mb-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Office" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Building Dreams on <span className="text-amber-500">Solid Ground</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Since 2020, LandPromoters has helped families and investors find trustworthy opportunities in real estate and land development.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500 rounded-3xl transform translate-x-4 translate-y-4 -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Our Story" 
              className="rounded-3xl shadow-xl w-full h-[500px] object-cover"
            />
          </div>
          <div>
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">A Legacy of Trust and Transparency</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                Founded in 2020, LandPromoters began with a simple vision: to make land investment safe, transparent, and accessible to everyone. In the years since, we have grown by helping families and investors make confident property decisions.
              </p>
              <p>
                From the beginning, we have understood that buying property is one of the most significant decisions in a person's life. That's why every property we promote is carefully checked for legal clarity, DTCP/RERA approval, and development potential.
              </p>
              <p>
                Our commitment has remained the same since day one: to support clients beyond the sale with registration assistance, clear guidance, and dependable after-sales service.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-amber-50 p-10 rounded-3xl">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide our clients with premium, legally secure real estate investments that guarantee high returns, while maintaining absolute transparency and ethical business practices in every transaction.
            </p>
          </div>
          <div className="bg-gray-50 p-10 rounded-3xl">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the most trusted and respected real estate developer in South India, known for transforming barren lands into thriving communities and creating lasting value for our investors.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-900 rounded-3xl p-12 text-center text-white mb-12">
          <h2 className="text-3xl font-bold mb-6">Join Our Growing Family</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            Experience the difference of working with a team that puts your interests first. Let us help you find the perfect property.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/properties" className="px-8 py-4 bg-amber-600 hover:bg-amber-700 font-bold rounded-xl transition-colors">
              Browse Properties
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 font-bold rounded-xl border border-white/20 transition-colors">
              Contact Us
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
