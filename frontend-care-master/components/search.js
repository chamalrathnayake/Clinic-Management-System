import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [nic, setNic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(nic);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6">
    <label htmlFor="nic" className="block text-lg font-medium mb-2">Search by NIC:</label>
    <input
      type="text"
      id="nic"
      value={nic}
      onChange={(e) => setNic(e.target.value)}
      placeholder="Enter NIC"
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
  </form>
  );
}
