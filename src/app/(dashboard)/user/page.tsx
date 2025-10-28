import { getCurrentUser } from "@/lib/getCurrentUser";

export async function generateMetadata() {
  const currentUser = await getCurrentUser();
  const userName = currentUser?.fullName || "User"; // Default to "User" if name is not available

  return {
    title: `${userName}'s Dashboard | My MLM Platform`,
    description: `Welcome, ${userName}! View your wallet balances, track income, investments, and manage all your financial activities in one place.`,
    keywords: [
      "mlm dashboard",
      "affiliate marketing",
      "network marketing",
      "wallet balance",
      "team performance",
      "referral earnings",
      "user profile",
      "investment tracker",
      "earnings summary",
      "crypto income",
    ],
  };
}

export default async function UserDashboardPage() {
  const currentUser = await getCurrentUser();
  // console.log("client c", { currentUser }); // Uncomment for debugging

  // Mock data for demonstration, replace with actual fetched data as needed
  const userStats = {
    wallet: 2500.75, // More realistic currency format
    referrals: 12,
    totalTeamMembers: 150, // Added for more comprehensive team overview
    rank: "Silver",
    nextRank: "Gold", // Added for motivation
    earningsThisMonth: 500,
    pendingWithdrawals: 150,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
          Welcome, {currentUser?.fullName || "User"} 👋
        </h1>
        <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out">
          Logout
        </button>
      </div>

      {/* User Info & Rank */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">User ID</p>
            <p className="text-xl font-bold text-gray-800 mt-1">
              {currentUser?.userId || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Current Rank</p>
            <p className="text-xl font-bold text-blue-600 mt-1">
              {userStats.rank}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Next Rank</p>
            <p className="text-xl font-bold text-purple-600 mt-1">
              {userStats.nextRank}
              <span className="ml-2 text-sm text-gray-500">(Keep going!)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Financial & Performance Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {/* Wallet Balance */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl shadow-lg p-7 flex flex-col justify-between transform hover:scale-105 transition duration-300 ease-in-out">
          <p className="text-lg font-medium opacity-90">Wallet Balance</p>
          <p className="text-4xl font-extrabold mt-2">
            ${userStats.wallet.toFixed(2)}
          </p>
          <p className="text-sm opacity-80 mt-4">Available for withdrawal</p>
        </div>

        {/* Referrals */}
        <div className="bg-white rounded-2xl shadow-lg p-7 border border-gray-100 flex flex-col justify-between transform hover:translate-y-[-5px] transition duration-300 ease-in-out">
          <p className="text-lg font-medium text-gray-500">Total Referrals</p>
          <p className="text-4xl font-extrabold text-purple-600 mt-2">
            {userStats.referrals}
          </p>
          <p className="text-sm text-gray-500 mt-4">Direct sign-ups</p>
        </div>

        {/* Earnings This Month */}
        <div className="bg-white rounded-2xl shadow-lg p-7 border border-gray-100 flex flex-col justify-between transform hover:translate-y-[-5px] transition duration-300 ease-in-out">
          <p className="text-lg font-medium text-gray-500">
            Earnings (This Month)
          </p>
          <p className="text-4xl font-extrabold text-indigo-600 mt-2">
            ${userStats.earningsThisMonth.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-4">Last 30 days income</p>
        </div>

        {/* Total Team Members */}
        <div className="bg-white rounded-2xl shadow-lg p-7 border border-gray-100 flex flex-col justify-between transform hover:translate-y-[-5px] transition duration-300 ease-in-out">
          <p className="text-lg font-medium text-gray-500">Total Team</p>
          <p className="text-4xl font-extrabold text-blue-600 mt-2">
            {userStats.totalTeamMembers}
          </p>
          <p className="text-sm text-gray-500 mt-4">Across all levels</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <button className="flex flex-col items-center justify-center p-6 bg-blue-500 text-white rounded-2xl shadow-md hover:bg-blue-600 transition duration-300 ease-in-out h-32 transform hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            <span className="text-lg font-semibold text-center">
              Share Referral Link
            </span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-green-500 text-white rounded-2xl shadow-md hover:bg-green-600 transition duration-300 ease-in-out h-32 transform hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-lg font-semibold text-center">
              Withdraw Earnings
            </span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-purple-500 text-white rounded-2xl shadow-md hover:bg-purple-600 transition duration-300 ease-in-out h-32 transform hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M9 20H9m4-9a4 4 0 11-8 0 4 4 0 018 0zm6 0a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
            <span className="text-lg font-semibold text-center">
              View My Team
            </span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-yellow-500 text-white rounded-2xl shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out h-32 transform hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m3 0V7a2 2 0 012-2h2a2 2 0 012 2v12m0 0h8a1 1 0 001-1v-1a2 2 0 00-2-2H9m13-4h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <span className="text-lg font-semibold text-center">
              Performance Reports
            </span>
          </button>
        </div>
      </div>

      {/* Recent Activity/News (Optional - for future expansion) */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recent Activity & Announcements
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center">
            <span className="inline-block w-2 h-2 mr-3 bg-blue-500 rounded-full"></span>
            You referred a new member, **Sarah J.** - Great job!
            <span className="ml-auto text-sm text-gray-500">2 hours ago</span>
          </li>
          <li className="flex items-center">
            <span className="inline-block w-2 h-2 mr-3 bg-green-500 rounded-full"></span>
            **$50.00** earnings credited from team sales.
            <span className="ml-auto text-sm text-gray-500">1 day ago</span>
          </li>
          <li className="flex items-center">
            <span className="inline-block w-2 h-2 mr-3 bg-purple-500 rounded-full"></span>
            New compensation plan updates coming next month. Stay tuned!
            <span className="ml-auto text-sm text-gray-500">3 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
