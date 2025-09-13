// components/Footer.jsx

import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Your MLM Company</h3>
            <p className="text-gray-400 text-sm">
              Empowering individuals to achieve financial freedom through our
              innovative platform and supportive community.
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Social Media Links - Replace with actual icons and links */}
              {/* For external links, a regular <a> tag is correct */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <i className="fab fa-facebook-f"></i>{" "}
                {/* Example: Font Awesome icon */}
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Our Products
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunity"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  The Opportunity
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal & Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Income Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info / Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-400 text-sm mb-2">
              Email:{" "}
              <a href="mailto:info@yourmlm.com" className="hover:text-white">
                info@yourmlm.com
              </a>
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Phone:{" "}
              <a href="tel:+1234567890" className="hover:text-white">
                +1 (234) 567-890
              </a>
            </p>

            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="p-2 rounded-l-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-sm w-full"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-md text-sm transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Your MLM Company. All rights reserved.</p>
          <p className="mt-2">Designed with ❤️ by Your Team.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
