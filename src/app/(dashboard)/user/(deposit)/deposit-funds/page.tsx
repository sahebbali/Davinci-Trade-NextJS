import CompanyWallet from "./CompanyWallet";
import DepositForm from "./DepositForm";

export default function DepositFunds() {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <CompanyWallet />
      <DepositForm />
    </div>
  );
}
