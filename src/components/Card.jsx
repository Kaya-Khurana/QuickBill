// src/components/Card.jsx
import { FaCode } from "react-icons/fa";

export default function Card({ title, description, footer }) {
  return (
    <div className="bg-[#fcf9f9] rounded-2xl shadow-lg p-8 mb-8 text-[#28A745] w-full">
      <h3 className="text-4xl font-bold mb-4">{title}</h3>
      <p className="text-lg text-[#28A745] mb-6">{description}</p>
      <button className="flex items-center gap-2 bg-[#28A745] text-white px-6 py-2 rounded-full hover:bg-green-600">
        <FaCode /> Button
      </button>
      <div className="mt-6 bg-[#28A745] text-white px-6 py-2 rounded-b-2xl">
        {footer}
      </div>
    </div>
  );
}
