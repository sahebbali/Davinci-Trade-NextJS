// app/wallet/page.tsx
import { getUserWallet } from "@/lib/actions/deposit.action";
import Link from "next/link";
import {
  FaCoins,
  FaGift,
  FaWallet,
  FaPiggyBank,
  FaChartLine,
  FaHandHoldingUsd,
} from "react-icons/fa";

export const metadata = {
  title: "My Wallet | Dashboard",
  description:
    "View your wallet balances, track income, investments, and manage all your financial activities in one place.",
  keywords: [
    "wallet dashboard",
    "investment tracker",
    "earnings summary",
    "user balance",
    "crypto income",
  ],
  openGraph: {
    title: "My Wallet | Dashboard",
    description:
      "Monitor your wallet activity, ROI, rewards, and income breakdown with a clean dashboard interface.",
    url: "https://yourdomain.com/wallet",
    siteName: "Your App Name",
    images: [
      {
        url: "https://yourdomain.com/og/wallet-preview.png",
        width: 1200,
        height: 630,
        alt: "Wallet Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Wallet | Dashboard",
    description:
      "Easily view your wallet, ROI, and reward income with a smooth modern dashboard.",
    images: ["https://yourdomain.com/og/wallet-preview.png"],
    creator: "@YourTwitterHandle",
  },
};
const currencyFormat = (amount) =>
  amount?.toLocaleString("en-US", { minimumFractionDigits: 2 });

export default async function WalletPage() {
  const mywallet = await getUserWallet();
  const wallet = mywallet?.data?.[0];

  const walletData = [
    {
      key: "depositBalance",
      title: "Deposit Balance",
      value: wallet?.depositBalance || 0,
      icon: <FaWallet className="text-blue-500" />,
    },
    {
      key: "activeIncome",
      title: "Active Income",
      value: wallet?.activeIncome || 0,
      icon: <FaChartLine className="text-green-500" />,
    },
    {
      key: "roiIncome",
      title: "ROI Income",
      value: wallet?.roiIncome || 0,
      icon: <FaCoins className="text-yellow-500" />,
    },
    {
      key: "rewardIncome",
      title: "Reward Income",
      value: wallet?.rewardIncome || 0,
      icon: <FaGift className="text-pink-500" />,
    },
    {
      key: "selfInvestment",
      title: "Self Investment",
      value: wallet?.selfInvestment || 0,
      icon: <FaPiggyBank className="text-purple-500" />,
    },
    {
      key: "withdrawalBallance",
      title: "Withdrawal Balance",
      value: wallet?.withdrawalBallance || 0,
      icon: <FaHandHoldingUsd className="text-teal-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm p-6 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">My Wallet</h1>
          <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition">
            <span className="font-semibold">View All Transactions</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Wallet Cards */}
      <main className="container mx-auto px-6">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Current Balances</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {walletData.map((item) => (
              <div
                key={item.key}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
                <div className="flex justify-between items-baseline mt-auto">
                  <p className="text-3xl font-extrabold">
                    ${currencyFormat(item.value)}
                  </p>
                  <span className="text-sm text-gray-400">USD</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 dark:bg-blue-800 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-extrabold mb-2">
              Ready to Grow Your Assets?
            </h2>
            <p className="text-blue-100 text-lg">
              Explore new investment opportunities and manage your portfolio.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/user/deposit-funds"
              className="bg-white text-blue-700 px-6 py-3 rounded-full font-bold hover:bg-blue-100 transition"
            >
              Invest Now
            </Link>
            <button className="border border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-blue-700 transition">
              Learn More
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
