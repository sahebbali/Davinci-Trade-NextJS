// components/CallToActionSection.jsx
import Link from 'next/link';

const CallToActionSection = () => {
  return (
    <section id="contact" className="bg-blue-600 py-16 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Ready to Elevate Your Trading?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join DaVinci-Trade today and unlock a world of intelligent trading possibilities.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/signup" className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
            Get Started Free
          </Link>
          <Link href="/contact" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transform hover:scale-105 transition-all duration-300">
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;