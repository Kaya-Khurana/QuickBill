export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-[250px] bg-[#28A745] text-white p-6 z-40 shadow-lg">
      <h1 className="text-2xl font-bold mb-8 flex items-center justify-between">
        QuickBill <span>💸</span>
      </h1>
      <ul className="space-y-6 text-lg">
        <li>📊 Dashboard</li>
        <li>➕ Create Invoice</li>
        <li>📋 My Invoices</li>
        <li>⚙️ Settings</li>
      </ul>
    </div>
  );
}

// // src/components/Sidebar.jsx
// import { FaFileInvoice, FaPlus, FaList, FaCog } from "react-icons/fa";
// import { MdSpaceDashboard } from "react-icons/md";

// export default function Sidebar() {
//   return (
//     <aside className="bg-[#28A745] text-white w-64 h-screen fixed top-0 left-0 shadow-xl flex flex-col p-6">
//       <h1 className="text-3xl font-bold mb-10">QuickBill 💸</h1>
//       <nav className="flex flex-col gap-6 text-lg">
//         <a href="/" className="flex items-center gap-3 hover:text-green-100">
//           <MdSpaceDashboard /> Dashboard
//         </a>
//         <a
//           href="/create"
//           className="flex items-center gap-3 hover:text-green-100"
//         >
//           <FaPlus /> Create Invoice
//         </a>
//         <a
//           href="/invoices"
//           className="flex items-center gap-3 hover:text-green-100"
//         >
//           <FaList /> My Invoices
//         </a>
//         <a
//           href="/settings"
//           className="flex items-center gap-3 hover:text-green-100"
//         >
//           <FaCog /> Settings
//         </a>
//       </nav>
//     </aside>
//   );
// }
