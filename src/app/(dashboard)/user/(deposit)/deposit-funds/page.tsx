import CompanyWallet from "./CompanyWallet";
import DepositForm from "./DepositForm";
export const metadata = {
  title: "Deposit Funds | Dashboard",
  description:
    "View your wallet balances, track income, investments, and manage all your financial activities in one place.",
  keywords: [
    "wallet dashboard",
    "investment tracker",
    "earnings summary",
    "user balance",
    "crypto income",
  ],
};
export default function DepositFunds() {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <CompanyWallet />
      <DepositForm />
    </div>
  );
}
