import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

export default function MyInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                      onClick={() => {
                        setSelectedInvoice(inv);
                        setShowModal(true);
                      }}
                    >
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

      {showModal && selectedInvoice && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative border border-gray-200">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-[#28A745] mb-2 text-center">
              {selectedInvoice.invoiceNumber}
            </h2>
            <button
              className="mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition block mx-auto"
              onClick={() => setShowModal(false)}
            >
              ← Back
            </button>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Customer:</span>{" "}
                {selectedInvoice.customerName}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {moment(selectedInvoice.date).format("DD MMM YYYY")}
              </p>
              <p>
                <span className="font-semibold">Total:</span> ₹{" "}
                {selectedInvoice.totalAmount}
              </p>
              <div className="mt-4">
                <span className="font-semibold">Products:</span>
                <ul className="list-disc ml-6 mt-1">
                  {selectedInvoice.products?.map((prod, idx) => (
                    <li key={idx}>
                      {prod.description} | Qty: {prod.quantity} | Price: ₹{" "}
                      {prod.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
