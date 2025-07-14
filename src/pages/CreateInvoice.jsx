import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";

export default function CreateInvoice() {
  const [customerName, setCustomerName] = useState("");
  const [gst, setGst] = useState(0);
  const [products, setProducts] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [success, setSuccess] = useState(false);
  const invoiceRef = useRef();

  useEffect(() => {
    setCustomerName("");
    setGst(0);
    setProducts([{ description: "", quantity: 1, price: 0 }]);
  }, []);

  const handleProductChange = (index, key, value) => {
    const updated = [...products];
    updated[index][key] =
      key === "price" || key === "quantity" ? Number(value) : value;
    setProducts(updated);
  };

  const addProductRow = () => {
    setProducts([...products, { description: "", quantity: 1, price: 0 }]);
  };

  const removeProductRow = (index) => {
    if (products.length === 1) return;
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const subtotal = products.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const gstAmount = (subtotal * gst) / 100;
  const totalAmount = subtotal + gstAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(16);
    doc.text("Karan General Store", 20, 20);
    doc.setFontSize(10);
    doc.text("Dhansura, Gujarat, India", 20, 25);
    doc.text("INVOICE", 150, 20, {
      align: "right",
    });
    doc.text(`Invoice : INV-0705`, 150, 25, { align: "right" });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 30, {
      align: "right",
    });

    // Bill To / Ship To
    doc.text("Bill To:", 20, 45);
    doc.text(customerName || "", 20, 50);
    doc.text("Ship To:", 100, 45);
    doc.text(customerName || "", 100, 50);

    // Table Header
    doc.setFillColor(173, 216, 230);
    doc.rect(20, 60, 170, 10, "F");
    doc.setDrawColor(0);
    doc.rect(20, 60, 170, 10);
    doc.setFontSize(10);
    doc.text("#", 25, 67);
    doc.text("Item & Description", 45, 67);
    doc.text("Qty", 115, 67, { align: "right" });
    doc.text("Price", 140, 67, { align: "right" });
    doc.text("Amount", 185, 67, { align: "right" });

    // Column dividers
    doc.line(40, 60, 40, 70);
    doc.line(105, 60, 105, 70);
    doc.line(125, 60, 125, 70);
    doc.line(160, 60, 160, 70);

    // Table Rows
    let yPos = 75;
    products.forEach((item, idx) => {
      doc.rect(20, yPos - 5, 170, 10);
      doc.line(40, yPos - 5, 40, yPos + 5);
      doc.line(105, yPos - 5, 105, yPos + 5);
      doc.line(125, yPos - 5, 125, yPos + 5);
      doc.line(160, yPos - 5, 160, yPos + 5);

      doc.text(`${idx + 1}`, 25, yPos);
      doc.text(item.description || "N/A", 45, yPos);
      doc.text(item.quantity.toString(), 115, yPos, { align: "right" });
      doc.text(`Rs. ${item.price.toFixed(2)}`, 150, yPos, { align: "right" });
      doc.text(`Rs. ${(item.quantity * item.price).toFixed(2)}`, 185, yPos, {
        align: "right",
      });

      yPos += 10;
    });

    // Totals Section (NEW ORDER: GST → Amount → Total)
    const totalsStartY = yPos + 10;
    doc.setFontSize(10);

    // GST Amount
    doc.rect(125, totalsStartY, 30, 10);
    doc.rect(155, totalsStartY, 35, 10);
    doc.text("GST Amount", 140, totalsStartY + 7, { align: "center" });
    doc.text(`Rs. ${gstAmount.toFixed(2)}`, 185, totalsStartY + 7, {
      align: "right",
    });

    // Subtotal (Amount)
    doc.rect(125, totalsStartY + 10, 30, 10);
    doc.rect(155, totalsStartY + 10, 35, 10);
    doc.text("Amount", 140, totalsStartY + 17, { align: "center" });
    doc.text(`Rs. ${subtotal.toFixed(2)}`, 185, totalsStartY + 17, {
      align: "right",
    });

    // Total Amount
    doc.rect(125, totalsStartY + 20, 30, 10);
    doc.rect(155, totalsStartY + 20, 35, 10);
    doc.text("Total Amount", 140, totalsStartY + 27, { align: "center" });
    doc.text(`Rs. ${totalAmount.toFixed(2)}`, 185, totalsStartY + 27, {
      align: "right",
    });

    // Terms
    const termsY = totalsStartY + 40;
    doc.setFontSize(10);
    doc.text("Terms & Conditions", 20, termsY);
    doc.text(
      "Please make to payment before Delivery. Goods can be return within 3 days of Shopping with us.",
      20,
      termsY + 7
    );
    doc.text("Thanks for shopping with us!", 20, termsY + 20);

    // Save PDF
    doc.save(`Invoice_${customerName || "Invoice"}.pdf`);

    // Reset form after download
    setCustomerName("");
    setGst(0);
    setProducts([{ description: "", quantity: 1, price: 0 }]);
  };

  // const handleDownloadPDF = () => {
  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   doc.setFontSize(16);
  //   doc.text("Karan General Store", 20, 20, { color: "#28A745" });
  //   doc.setFontSize(10);
  //   doc.text("Dhansura, Gujarat, India", 20, 25);
  //   doc.text("INVOICE", 150, 20, {
  //     align: "right",
  //     bold: true,
  //     color: "#28A745",
  //   });
  //   doc.text(`Invoice : INV-0705`, 150, 25, { align: "right", bold: true });
  //   doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 30, {
  //     align: "right",
  //   });

  //   // Bill To / Ship To
  //   doc.text("Bill To:", 20, 45);
  //   doc.text(customerName || "", 20, 50);
  //   doc.text("Ship To:", 100, 45);
  //   doc.text(customerName || "", 100, 50);

  //   // Table Header
  //   doc.setFillColor(173, 216, 230);
  //   doc.rect(20, 60, 170, 10, "F");
  //   doc.setDrawColor(0);
  //   doc.rect(20, 60, 170, 10);
  //   doc.setFontSize(10);
  //   doc.text("#", 25, 67);
  //   doc.text("Item & Description", 45, 67);
  //   doc.text("Qty", 115, 67, { align: "right" });
  //   doc.text("Price", 140, 67, { align: "right" });
  //   doc.text("Amount", 185, 67, { align: "right" });

  //   // Column dividers
  //   doc.line(40, 60, 40, 70);
  //   doc.line(105, 60, 105, 70);
  //   doc.line(125, 60, 125, 70);
  //   doc.line(160, 60, 160, 70);

  //   // Table Rows
  //   let yPos = 75;
  //   products.forEach((item, idx) => {
  //     doc.rect(20, yPos - 5, 170, 10);
  //     doc.line(40, yPos - 5, 40, yPos + 5);
  //     doc.line(105, yPos - 5, 105, yPos + 5);
  //     doc.line(125, yPos - 5, 125, yPos + 5);
  //     doc.line(160, yPos - 5, 160, yPos + 5);

  //     doc.text(`${idx + 1}`, 25, yPos);
  //     doc.text(item.description || "N/A", 45, yPos);
  //     doc.text(item.quantity.toString(), 115, yPos, { align: "right" });
  //     doc.text(`Rs. ${item.price.toFixed(2)}`, 150, yPos, { align: "right" });
  //     doc.text(`Rs. ${(item.quantity * item.price).toFixed(2)}`, 185, yPos, {
  //       align: "right",
  //     }); // <-- FIXED: Amount now inside box

  //     yPos += 10;
  //   });

  //   // Totals Section (in table layout)
  //   const totalsStartY = yPos + 10;
  //   doc.setFontSize(10);
  //   doc.rect(125, totalsStartY + 10, 30, 10);
  //   doc.rect(155, totalsStartY + 10, 35, 10);
  //   doc.text("GST Amount", 140, totalsStartY + 17, { align: "center" });
  //   doc.text(`Rs. ${gstAmount.toFixed(2)}`, 185, totalsStartY + 17, {
  //     align: "right",
  //   });
  //   doc.rect(125, totalsStartY, 30, 10);
  //   doc.rect(155, totalsStartY, 35, 10);
  //   doc.text("Total Amount ", 140, totalsStartY + 7, { align: "center" });
  //   doc.text(`Rs. ${subtotal.toFixed(2)}`, 185, totalsStartY + 7, {
  //     align: "right",
  //   });

  //   const termsY = totalsStartY + 30;
  //   doc.setFontSize(10);
  //   doc.text("Terms & Conditions", 20, termsY);
  //   doc.text(
  //     "Please make to payment before Delivery.Goods can be return within 3 days of Shopping with us.",
  //     20,
  //     termsY + 7
  //   );
  //   doc.text("Thanks for shopping with us!", 20, termsY + 20);

  //   // Save PDF
  //   doc.save(`Invoice_${customerName || "Invoice"}.pdf`);
  //   // Reset form after download
  //   setCustomerName("");
  //   setGst(0);
  //   setProducts([{ description: "", quantity: 1, price: 0 }]);
  // };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-[#28A745] mb-6 text-center">
        Create Invoice
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg space-y-6 mb-8 max-w-3xl mx-auto"
      >
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Bill To
          </label>
          <input
            type="text"
            className="w-full border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#28A745] focus:border-transparent"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            placeholder="Enter Customer Name"
          />
        </div>

        <div className="grid grid-cols-4 gap-4 font-semibold text-gray-700 bg-gray-100 p-2 rounded-md">
          <div>Description</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Action</div>
        </div>

        {products.map((item, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-4">
            <input
              type="text"
              value={item.description}
              onChange={(e) =>
                handleProductChange(idx, "description", e.target.value)
              }
              className="border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#28A745] focus:border-transparent"
              required
              placeholder="Enter Item"
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleProductChange(
                  idx,
                  "quantity",
                  Math.max(1, Number(e.target.value))
                )
              }
              className="border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#28A745] focus:border-transparent"
              min="1"
              required
            />
            <input
              type="number"
              value={item.price === 0 ? "" : item.price}
              onChange={(e) =>
                handleProductChange(
                  idx,
                  "price",
                  Math.max(0, Number(e.target.value))
                )
              }
              className="border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#28A745] focus:border-transparent"
              min="0"
              required
              placeholder="Enter Price"
            />
            <button
              type="button"
              onClick={() => removeProductRow(idx)}
              className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition ${
                products.length === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={products.length === 1}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addProductRow}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition w-full"
        >
          Add Product
        </button>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            GST (%)
          </label>
          <input
            type="number"
            value={gst}
            onChange={(e) =>
              setGst(Math.max(0, Math.min(100, Number(e.target.value))))
            }
            className="w-full border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#28A745] focus:border-transparent"
            min="0"
            max="100"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#28A745] text-white px-6 py-2 rounded-md hover:bg-green-600 transition w-full"
        >
          Create Invoice
        </button>
        {success && (
          <div className="text-green-600 font-semibold text-center mt-2">
            Invoice Created Successfully!
          </div>
        )}
      </form>

      {/* Invoice Preview */}
      <div
        ref={invoiceRef}
        className="bg-white mx-auto rounded-lg shadow-xl p-8 w-full max-w-3xl relative"
      >
        <div className="flex justify-between items-start mb-6 border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#28A745]">
              Karan General Store
            </h2>
            <p className="text-sm text-gray-600">Dhansura, Gujarat, India</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-blue-700">INVOICE</h2>
            <p className="text-sm mt-1">
              <span className="font-semibold">Invoice:</span> INV-0705
            </p>
            <p className="text-sm">
              <span className="font-semibold">Date:</span>{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <div className="font-semibold text-gray-700">Bill To:</div>
            <div className="mt-1">{customerName || ""}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Ship To:</div>
            <div className="mt-1">{customerName || ""}</div>
          </div>
        </div>
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Item & Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right">
                Qty
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="border border-gray-300 px-4 py-2">{idx + 1}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.description}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ₹ {item.price.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ₹ {(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <table className="text-right">
            <tbody>
              <tr>
                <td className="pr-6 font-semibold text-gray-700">
                  GST Amount:
                </td>
                <td>₹ {gstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="pr-6 font-semibold text-gray-700">Amount:</td>
                <td>₹ {subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="pr-6 font-semibold text-gray-700">
                  Total Amount:
                </td>
                <td>₹ {(subtotal + gstAmount).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div className="flex justify-end">
          <table className="text-right">
            <tbody>
              <tr>
                <td className="pr-6 font-semibold text-gray-700">
                  GST Amount:
                </td>
                <td>₹ {gstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="pr-6 font-semibold text-gray-700">Amount:</td>
                <td>₹ {subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="pr-6 font-semibold text-gray-700">
                  Total Amount:
                </td>
                <td>₹ {gst + subtotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div className="mt-6 text-sm text-gray-600 border-t pt-4">
          <div className="font-semibold">Terms & Conditions</div>
          <div className="mt-2">Please make to payment before Delivery.</div>
          <div className="mt-2">
            Goods can be return within 3 days of Shopping with us.
          </div>
        </div>
        <div className="mt-4 text-center text-gray-700">
          Thanks for shopping with us!
        </div>
        {/* Watermark effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <h2 className="text-6xl font-bold text-gray-300 rotate-45">
            Karan General Store
          </h2>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
}
