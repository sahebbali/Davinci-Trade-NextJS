// app/wallet/page.tsx
import {
  FaBitcoin,
  FaEthereum,
  FaDollarSign,
  FaPiggyBank,
} from "react-icons/fa";
import { SiTether } from "react-icons/si";

export default function WalletPage() {
  const walletData = [
    {
      title: "Bitcoin",
      abbreviation: "(BTC)",
      value: "12,450.00",
      icon: <FaBitcoin className="text-orange-500" />,
    },
    {
      title: "Ethereum",
      abbreviation: "(ETH)",
      value: "3,200.00",
      icon: <FaEthereum className="text-blue-500" />,
    },
    {
      title: "Tether",
      abbreviation: "(USDT)",
      value: "5,000.00",
      icon: <SiTether className="text-green-500" />,
    },
    {
      title: "Savings Account",
      abbreviation: "",
      value: "8,750.00",
      icon: <FaPiggyBank className="text-purple-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-sm p-6 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
            My Wallet
          </h1>
          <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200">
            <span className="font-semibold">View All Transactions</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Current Balances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {walletData.map((item, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {item.title}
                    </h3>
                    {item.abbreviation && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.abbreviation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mt-auto">
                  <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    ${item.value}
                  </p>
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    USD
                  </span>
                </div>
                <button className="absolute bottom-2 right-4 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-600 dark:bg-blue-800 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-extrabold mb-2">
              Ready to Grow Your Assets?
            </h2>
            <p className="text-blue-100 dark:text-blue-200 text-lg">
              Explore new investment opportunities and manage your portfolio.
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-700 dark:text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-blue-100 transition-colors duration-200 shadow-md">
              Invest Now
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-blue-700 dark:hover:text-blue-900 transition-colors duration-200 shadow-md">
              Learn More
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
