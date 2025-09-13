import {
  FaChartBar,
  FaShieldAlt,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

const features = [
  {
    name: "Advanced Analytics",
    description:
      "Gain deep insights with our cutting-edge analytics tools and real-time data visualization.",
    icon: FaChartBar,
  },
  {
    name: "Secure & Reliable",
    description:
      "Trade with confidence on a platform built with industry-leading security protocols.",
    icon: FaShieldAlt,
  },
  {
    name: "Community Support",
    description:
      "Connect with expert traders and grow your network in our vibrant community.",
    icon: FaUsers,
  },
  {
    name: "Intuitive Interface",
    description:
      "Easy-to-use design makes trading accessible for both beginners and seasoned pros.",
    icon: FaCheckCircle,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-white sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Why Choose DaVinci-Trade?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Experience a new era of trading with tools designed to give you an
            edge in the market.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
