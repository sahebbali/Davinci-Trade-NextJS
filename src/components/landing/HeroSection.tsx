// components/HeroSection.jsx
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 lg:py-32 overflow-hidden">
      {/* Background shape/gradient for visual interest */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#fff" fillOpacity="0.1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,160C672,171,768,213,864,208C960,203,1056,155,1152,138.7C1248,123,1344,139,1392,146.7L1440,155L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill="#fff" fillOpacity="0.05" d="M0,192L48,170.7C96,149,192,107,288,106.7C384,107,480,149,576,170.7C672,192,768,192,864,181.3C960,171,1056,149,1152,144C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Unleash Your Trading Potential <br className="hidden sm:inline" />with DaVinci-Trade
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-10">
          Revolutionary platform for intelligent trading, empowering you with advanced tools and insights.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/signup" className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
            Start Trading Now
          </Link>
          <Link href="#how-it-works" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transform hover:scale-105 transition-all duration-300">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;