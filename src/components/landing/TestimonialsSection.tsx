// components/TestimonialsSection.jsx
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    quote: "DaVinci-Trade has revolutionized my approach to the market. The analytics are unparalleled!",
    author: 'Jane Doe',
    title: 'Independent Trader',
    image: '/images/avatar-1.jpg', // Placeholder image
  },
  {
    id: 2,
    quote: "The security and community support here are fantastic. I feel truly empowered.",
    author: 'John Smith',
    title: 'Investment Enthusiast',
    image: '/images/avatar-2.jpg', // Placeholder image
  },
  {
    id: 3,
    quote: "Finally, a platform that combines powerful tools with a user-friendly experience. Highly recommended!",
    author: 'Emily White',
    title: 'Financial Analyst',
    image: '/images/avatar-3.jpg', // Placeholder image
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 bg-white sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            What Our Traders Say
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Hear from our satisfied users who are achieving their financial goals with DaVinci-Trade.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-lg text-gray-700 italic">"{testimonial.quote}"</p>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  {/* You'll need to create placeholder images in your public/images folder */}
                  {/* For example: public/images/avatar-1.jpg, avatar-2.jpg, avatar-3.jpg */}
                  <Image
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-base font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-blue-600">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;