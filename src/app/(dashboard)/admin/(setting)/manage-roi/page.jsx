import ManageROIButton from "./ManageROIButtion";

export default async function ManageROI() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Manage ROI</h1>
          <p className="text-gray-600 mb-8">
            Calculate and track your return on investment
          </p>

          <div className="space-y-6">
            <form
              //   action={calculateROI}
              className="flex flex-col items-center gap-4"
            >
              {/* <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Calculate ROI
              </button> */}
              <ManageROIButton />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
