import { useState } from "react";
import ChatPage from "../ChatPages/ChatPage";
import Header from "../../components/Header";
import EditSponsorsDetails from "../../components/SponsorComponents/EditSponsorsDetails";
import ReactingNavBar from "../../components/ReactingNavBar";
import { Navigate, useNavigate } from "react-router-dom";

const token = localStorage.getItem("data");

function SponsorsDashboard() {
  const [selected, setSelected] = useState(0);
 const navigate=useNavigate();
  return (
    <div>
      <div className="flex min-h-screen">
        {/* Side Navigation */}
        <ReactingNavBar />

        {/* Main Content */}
        <div className="flex-1 space-y-6 text-white">
          <Header />

          <div className="flex flex-col items-center mt-4">
            {/* Card for Editing Options */}
            <div className="w-full max-w-4xl p-6 bg-purple-800 rounded-lg shadow-lg">
              <div className="flex justify-around">
                <button
                  onClick={() => {}}
                  className={`px-6 py-2 text-xl font-semibold rounded-md transition ${
                    selected === 0 ? "bg-purple-600 text-white" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Details
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full max-w-4xl mt-8 rounded-lg shadow-lg p-6">
              <div className="">
                <h2 className="text-2xl font-bold mb-4"></h2>
                <EditSponsorsDetails />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SponsorsDashboard;
