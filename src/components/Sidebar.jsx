// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import { FaFileInvoice, FaPlus, FaList, FaCog } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

export default function Sidebar() {
  return (
    <aside className="bg-[#28A745] text-white w-[250px] h-screen fixed top-0 left-0 shadow-xl flex flex-col p-6 z-40">
      <h1 className="text-3xl font-bold mb-10 flex items-center justify-between">
        QuickBill <span>💸</span>
      </h1>

      <nav className="flex flex-col gap-6 text-lg">
        <Link to="/" className="flex items-center gap-3 hover:text-green-100">
          <MdSpaceDashboard /> Dashboard
        </Link>

        <Link
          to="/create-invoice"
          className="flex items-center gap-3 hover:text-green-100"
        >
          <FaPlus /> Create Invoice
        </Link>

        <Link
          to="/invoices"
          className="flex items-center gap-3 hover:text-green-100"
        >
          <FaList /> My Invoices
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 hover:text-green-100"
        >
          <FaCog /> Settings
        </Link>
      </nav>
    </aside>
  );
}
