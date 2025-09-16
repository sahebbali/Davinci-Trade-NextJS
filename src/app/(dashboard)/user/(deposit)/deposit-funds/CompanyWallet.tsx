import Image from "next/image";

// interface CompanyWalletProps {
//   accountNumber: string;
//   qrCodeSrc: string;
// }

export default function CompanyWallet() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Company Wallet</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div>
          <p className="text-gray-600">Account Number:</p>
          <p className="text-lg font-medium">0x8373734jeue73738h3y373737</p>
        </div>
        <div className="relative w-40 h-40">
          <Image
            src="/images/qr-code.svg"
            alt="Company QR Code"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
