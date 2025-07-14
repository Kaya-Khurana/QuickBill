import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

export default function MyInvoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/invoices")
      .then((res) => setInvoices(res.data))
      .catch((err) => console.error("Error loading invoices:", err));
  }, []);

  return (
    <div className="p-8 ml-[250px]">
      <h2 className="text-2xl font-bold text-[#28A745] mb-6">📋 My Invoices</h2>

      <div className="bg-white shadow-lg rounded-lg p-4 overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#28A745] text-white">
            <tr>
              <th className="p-3 text-left">Invoice No</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Total (₹)</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr
                  key={inv._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">{inv.invoiceNumber}</td>
                  <td className="p-3">{inv.customerName}</td>
                  <td className="p-3">
                    {moment(inv.date).format("DD MMM YYYY")}
                  </td>
                  <td className="p-3">₹ {inv.totalAmount}</td>
                  <td className="p-3">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                      View
                    </button>
                    {/* Future: Add Edit/Delete */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
