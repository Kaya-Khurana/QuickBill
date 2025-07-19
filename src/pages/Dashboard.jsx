import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.username) setUsername(user.username);
  }, [user]);

  useEffect(() => {
    if (!user?.id) return;
    axios
      .get(`http://localhost:5000/api/invoices?userId=${user.id}`)
      .then((res) => setInvoices(res.data))
      .catch((err) => console.error("Error loading invoices:", err));
  }, [user]);

  return (
    <main
      className="bg-[#f7f8fa] min-h-[calc(100vh-4rem)] pt-24 px-8 pb-10 overflow-auto space-y-10 transition-all"
      style={{ marginLeft: 250 }} // Sidebar is 250px wide
    >
      {/* Welcome Section */}
      <div className="bg-white shadow-lg p-8 rounded-2xl flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-[#28A745] mb-2 flex items-center gap-2">
          Welcome{username ? `, ${username}` : ""} <span>👋</span>
        </h2>
        <p className="text-gray-600 mb-4">
          QuickBill is a modern, simple invoice generator. Create, manage,
          print, and share professional invoices quickly and efficiently.
        </p>
        <button
          onClick={() => navigate("/create-invoice")}
          className="bg-[#28A745] text-white px-6 py-2 rounded-full hover:bg-green-600 transition flex items-center gap-2 self-start"
        >
          <span>➕</span> Create Invoice
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Total Invoices */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-[#28A745] mb-2 flex items-center gap-2">
            <span>📄</span> Total Invoices
          </h3>
          <p className="text-gray-600 mb-4">
            You’ve created{" "}
            <span className="font-bold text-[#28A745]">{invoices.length}</span>{" "}
            invoices this month.
          </p>
          <button className="bg-[#28A745] text-white px-4 py-2 rounded-full hover:bg-green-600 transition self-start">
            Track billing performance
          </button>
        </div>

        {/* Total Revenue */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-[#28A745] mb-2 flex items-center gap-2">
            <span>💰</span> Total Revenue
          </h3>
          <p className="text-gray-600 mb-4">
            <span className="font-bold text-[#28A745]">
              ₹{" "}
              {invoices
                .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0)
                .toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>{" "}
            collected in July.
          </p>
          <button className="bg-[#28A745] text-white px-4 py-2 rounded-full hover:bg-green-600 transition self-start">
            Overview of earnings
          </button>
        </div>
      </div>
    </main>
  );
}
