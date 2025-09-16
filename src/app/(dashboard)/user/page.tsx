export default function UserPage() {
  const user = {
    name: "John Doe",
    userId: "MLM12345",
    wallet: 2500,
    referrals: 12,
    rank: "Silver",
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {user.name} 👋</h1>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      {/* User Info */}
      <div className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center">
        <div>
          <p className="text-gray-500">User ID</p>
          <p className="font-semibold">{user.userId}</p>
        </div>
        <div>
          <p className="text-gray-500">Rank</p>
          <p className="font-semibold text-blue-600">{user.rank}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-500">Wallet Balance</p>
          <p className="text-xl font-bold text-green-600">${user.wallet}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-500">Referrals</p>
          <p className="text-xl font-bold text-purple-600">{user.referrals}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-500">Team Performance</p>
          <p className="text-xl font-bold text-blue-600">Growing 🚀</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Share Referral Link
          </button>
          <button className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Withdraw Earnings
          </button>
          <button className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
            View My Team
          </button>
        </div>
        <div className="m-4 p-6">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste eaque
            aliquid iure libero consequatur, dolorum quas error. Fuga,
            consequatur quam adipisci vero odit, at error, doloremque saepe
            consequuntur cum sed?
          </h2>
        </div>
        <div className="m-4 p-6">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste eaque
            aliquid iure libero consequatur, dolorum quas error. Fuga,
            consequatur quam adipisci vero odit, at error, doloremque saepe
            consequuntur cum sed?
          </h2>
        </div>
        <div className="m-4 p-6">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste eaque
            aliquid iure libero consequatur, dolorum quas error. Fuga,
            consequatur quam adipisci vero odit, at error, doloremque saepe
            consequuntur cum sed?
          </h2>
        </div>
        <div className="m-4 p-6">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste eaque
            aliquid iure libero consequatur, dolorum quas error. Fuga,
            consequatur quam adipisci vero odit, at error, doloremque saepe
            consequuntur cum sed?
          </h2>
        </div>
        <div className="m-4 p-6">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste eaque
            aliquid iure libero consequatur, dolorum quas error. Fuga,
            consequatur quam adipisci vero odit, at error, doloremque saepe
            consequuntur cum sed?
          </h2>
        </div>
        <div className="m-4 p-6">
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste eaque
            aliquid iure libero consequatur, dolorum quas error. Fuga,
            consequatur quam adipisci vero odit, at error, doloremque saepe
            consequuntur cum sed?
          </h2>
        </div>
      </div>
    </div>
  );
}
