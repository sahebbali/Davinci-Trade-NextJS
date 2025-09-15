import CompanyWallet from "./CompanyWallet";
import DepositForm from "./DepositForm";

// interface DepositFundsProps {
//   accountNumber: string;
//   qrCodeSrc: string;
// }

export default function DepositFunds() {
  return (
    <div className="w-full mx-auto mt-8 p-4">
      <CompanyWallet />
      <DepositForm />
    </div>
  );
}
