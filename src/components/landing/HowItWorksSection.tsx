// components/HowItWorksSection.jsx
const steps = [
  {
    id: 1,
    title: 'Register Your Account',
    description: 'Sign up in minutes with our simple and secure registration process.',
  },
  {
    id: 2,
    title: 'Fund Your Wallet',
    description: 'Easily deposit funds using various secure payment methods.',
  },
  {
    id: 3,
    title: 'Explore Markets',
    description: 'Dive into a wide range of trading instruments and opportunities.',
  },
  {
    id: 4,
    title: 'Start Trading',
    description: 'Utilize our advanced tools and execute trades with confidence.',
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 bg-gray-100 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Process</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Simple Steps to Success
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Getting started with DaVinci-Trade is straightforward and designed for your convenience.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xl">
                  {step.id}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;