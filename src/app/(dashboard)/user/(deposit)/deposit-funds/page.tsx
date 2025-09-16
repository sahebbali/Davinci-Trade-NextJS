import CompanyWallet from "./CompanyWallet";
import DepositForm from "./DepositForm";

export default function DepositFunds() {
  return (
    <div className="w-full mx-auto mt-18 p-4">
      <CompanyWallet />
      <DepositForm />
    </div>
  );
}
