import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CreateInvoice() {
  const [customerName, setCustomerName] = useState("");
  const [gst, setGst] = useState(18);
  const [products, setProducts] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [success, setSuccess] = useState(false);
  const invoiceRef = useRef();

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
    // You can add your API call here if needed
  };

  //   const handleDownloadPDF = async () => {
  //     const input = invoiceRef.current;
  //     if (!input) return;
  //     // Scroll to top to ensure full capture
  //     window.scrollTo(0, 0);
  //     // Wait for DOM to render
  //     await new Promise((resolve) => setTimeout(resolve, 300));
  //     const canvas = await html2canvas(input, {
  //       scale: 2,
  //       useCORS: true,
  //       backgroundColor: "#fff",
  //     });
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "pt",
  //       format: "a4",
  //     });
  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();
  //     const imgProps = pdf.getImageProperties(imgData);
  //     let pdfWidth = pageWidth - 40;
  //     let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     // If invoice is too tall, fit to page
  //     if (pdfHeight > pageHeight - 40) {
  //       pdfHeight = pageHeight - 40;
  //       pdfWidth = (imgProps.width * pdfHeight) / imgProps.height;
  //     }
  //     pdf.addImage(imgData, "PNG", 20, 20, pdfWidth, pdfHeight);
  //     pdf.save(`Invoice_${customerName || "Customer"}.pdf`);
  //   };
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Add title and store info
    doc.setFontSize(20);
    doc.text("Karan General Store", 20, 20);
    doc.setFontSize(12);
    doc.text("123, Market Road, Vadodara, Gujarat, India", 20, 30);
    doc.text("INVOICE", 160, 20);
    doc.text(`Invoice #: INV-${Date.now()}`, 160, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, 40);
    doc.text("Due: On Receipt", 160, 50);

    // Add Bill To and Ship To
    doc.text("Bill To:", 20, 60);
    doc.text(customerName || "Customer Name", 20, 70);
    doc.text("Ship To:", 100, 60);
    doc.text(customerName || "Customer Name", 100, 70);

    // Add table header with borders
    doc.setFillColor(173, 216, 230); // Light blue background
    doc.rect(20, 80, 170, 10, "F"); // Header background
    doc.setDrawColor(0, 0, 0); // Black border
    doc.rect(20, 80, 170, 10); // Header border

    doc.setFontSize(12);
    doc.text("#", 25, 87);
    doc.text("Item & Description", 40, 87);
    doc.text("Qty", 110, 87);
    doc.text("Price", 130, 87);
    doc.text("Amount", 150, 87);

    // Draw table columns
    doc.line(35, 80, 35, 90); // after #
    doc.line(105, 80, 105, 90); // after Item
    doc.line(125, 80, 125, 90); // after Qty
    doc.line(145, 80, 145, 90); // after Price

    // Add table rows with borders
    let yPos = 95;
    products.forEach((item, idx) => {
      doc.rect(20, yPos - 7, 170, 10); // Row border
      doc.line(35, yPos - 7, 35, yPos + 3); // after #
      doc.line(105, yPos - 7, 105, yPos + 3); // after Item
      doc.line(125, yPos - 7, 125, yPos + 3); // after Qty
      doc.line(145, yPos - 7, 145, yPos + 3); // after Price

      doc.text(`${idx + 1}`, 25, yPos);
      doc.text(item.description || "N/A", 40, yPos);
      doc.text(item.quantity.toString(), 110, yPos);
      doc.text(`₹ ${item.price.toFixed(2)}`, 130, yPos);
      doc.text(`₹ ${(item.quantity * item.price).toFixed(2)}`, 150, yPos);
      yPos += 10;
    });

    // Add totals
    doc.text(`Tax Rate: ${gst}%`, 130, yPos + 10);
    doc.text(`Total: ₹ ${subtotal.toFixed(2)}`, 130, yPos + 20);
    doc.text(
      `GST Amount: ₹ ${((subtotal * gst) / 100).toFixed(2)}`,
      130,
      yPos + 30
    );
    doc.text(
      `Balance Due: ₹ ${(subtotal + (subtotal * gst) / 100).toFixed(2)}`,
      130,
      yPos + 40
    );

    // Add terms
    doc.text("Terms & Conditions", 20, yPos + 60);
    doc.text(
      "Full payment is due upon receipt. Late payments may be subject to additional fees.",
      20,
      yPos + 70
    );
    doc.text("Thanks for shopping with us!", 20, yPos + 80);

    // Download the PDF
    doc.save(`Invoice_${customerName || "Customer"}.pdf`);
  };
  return (
    <div className="p-8 min-h-screen bg-gray-100" style={{ marginLeft: 250 }}>
      <h1 className="text-3xl font-bold text-[#28A745] mb-4">Create Invoice</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-md space-y-4 mb-8"
      >
        <div>
          <label className="block font-medium mb-1">Bill To</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-4 gap-4 font-bold">
          <div>Description</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Action</div>
        </div>

        {products.map((item, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-4 mb-2">
            <input
              type="text"
              value={item.description}
              onChange={(e) =>
                handleProductChange(idx, "description", e.target.value)
              }
              className="border p-2 rounded"
              required
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
              className="border p-2 rounded"
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
                  Math.max(1, Number(e.target.value))
                )
              }
              className="border p-2 rounded"
              min="1"
              required
              placeholder="Price"
            />
            <button
              type="button"
              onClick={() => removeProductRow(idx)}
              className={`bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ${
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
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>

        <div className="mt-4">
          <label className="block font-medium mb-1">GST (%)</label>
          <input
            type="number"
            value={gst}
            onChange={(e) => setGst(Number(e.target.value))}
            className="w-full border p-2 rounded"
            min="0"
            max="100"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#28A745] text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Create Invoice
        </button>
        {success && (
          <div className="text-green-600 font-semibold mt-2">
            Invoice Created Successfully!
          </div>
        )}
      </form>

      {/* Invoice Preview */}
      <div
        ref={invoiceRef}
        className="bg-white mx-auto rounded-lg shadow-xl p-8 w-full max-w-2xl"
        style={{ backgroundColor: "#fff" }} // ensure no oklch here
      >
        <h2 className="text-xl font-bold" style={{ color: "#28A745" }}>
          Karan General Store
        </h2>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#28A745]">
              Karan General Store
            </h2>
            <p className="text-sm text-gray-600">
              123, Market Road, Vadodara, Gujarat, India
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-blue-700">INVOICE</span>
            <div className="text-sm mt-2">
              <div>
                <span className="font-semibold">Invoice #:</span> INV-
                {Date.now()}
              </div>
              <div>
                <span className="font-semibold">Date:</span>{" "}
                {new Date().toLocaleDateString()}
              </div>
              <div>
                <span className="font-semibold">Due:</span> On Receipt
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="font-semibold">Bill To:</div>
            <div>{customerName || "Customer Name"}</div>
          </div>
          <div>
            <div className="font-semibold">Ship To:</div>
            <div>{customerName || "Customer Name"}</div>
          </div>
        </div>
        <table className="w-full border mb-4">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Item & Description</th>
              <th className="border px-2 py-1">Qty</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">{idx + 1}</td>
                <td className="border px-2 py-1">{item.description}</td>
                <td className="border px-2 py-1">{item.quantity}</td>
                <td className="border px-2 py-1">₹ {item.price}</td>
                <td className="border px-2 py-1">
                  ₹ {item.quantity * item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <table>
            <tbody>
              <tr>
                <td className="pr-4 font-semibold">Tax Rate:</td>
                <td>{gst}%</td>
              </tr>
              <tr>
                <td className="pr-4 font-semibold">Total:</td>
                <td>₹ {subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="pr-4 font-semibold">GST Amount:</td>
                <td>₹ {gstAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="pr-4 font-semibold">Balance Due:</td>
                <td className="text-blue-700 font-bold text-lg">
                  ₹ {totalAmount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-sm text-gray-600">
          <div className="font-semibold">Terms & Conditions</div>
          <div>
            Full payment is due upon receipt. Late payments may be subject to
            additional fees.
          </div>
        </div>
        <div className="mt-4 text-center text-gray-700">
          Thanks for shopping with us!
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
}
