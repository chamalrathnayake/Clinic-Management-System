"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar";
const MakeInventroyPage = () => {
  const [drugs, setDrugs] = useState([]);
  const [newDrug, setNewDrug] = useState({
    drugName: "",
    batchNumber: "",
    quantity: "",
    manufacturer: "",
    expirationDate: "",
    price: "",
    description: "",
  });
  const [editDrugId, setEditDrugId] = useState(null);
  const [editDrug, setEditDrug] = useState({ ...newDrug });

  // Fetch all drugs
  const fetchDrugs = async () => {
    try {
      const response = await axios.get("http://localhost:5001/inventory");
      setDrugs(response.data);
    } catch (error) {
      console.error("Error fetching drugs:", error);
    }
  };

  // Add a new drug
  const addDrug = async () => {
    try {
      await axios.post("http://localhost:5001/inventory", newDrug); // Replace with your API endpoint
      fetchDrugs();
      setNewDrug({
        drugName: "",
        batchNumber: "",
        quantity: "",
        manufacturer: "",
        expirationDate: "",
        price: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding drug:", error);
    }
  };

  // Update a drug
  const updateDrug = async (id) => {
    try {
      await axios.put(`http://localhost:5001/inventory/${id}`, editDrug);
      fetchDrugs();
      setEditDrugId(null);
    } catch (error) {
      console.error("Error updating drug:", error);
    }
  };

  // Delete a drug
  const deleteDrug = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/inventory/${id}`);
      fetchDrugs();
    } catch (error) {
      console.error("Error deleting drug:", error);
    }
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header / Title */}
      <NavBar hideTitle={true} title="Drug Inventory" />
      <h1 className="text-3xl font-bold pt-3 mb-6">Drug Inventory</h1>

      {/* Add Drug Form */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Drug</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Drug Name"
            value={newDrug.drugName}
            onChange={(e) =>
              setNewDrug({ ...newDrug, drugName: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Batch Number"
            value={newDrug.batchNumber}
            onChange={(e) =>
              setNewDrug({ ...newDrug, batchNumber: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newDrug.quantity}
            onChange={(e) =>
              setNewDrug({ ...newDrug, quantity: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Manufacturer"
            value={newDrug.manufacturer}
            onChange={(e) =>
              setNewDrug({ ...newDrug, manufacturer: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="date"
            placeholder="Expiration Date"
            value={newDrug.expirationDate}
            onChange={(e) =>
              setNewDrug({ ...newDrug, expirationDate: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newDrug.price}
            onChange={(e) => setNewDrug({ ...newDrug, price: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newDrug.description}
            onChange={(e) =>
              setNewDrug({ ...newDrug, description: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={addDrug}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Add Drug
        </button>
      </div>

      {/* Drug List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Drug Inventory List</h2>
        {drugs.length === 0 ? (
          <p>No drugs available</p>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Batch Number</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Manufacturer</th>
                <th className="px-4 py-2">Expiration Date</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drugs.map((drug) => (
                <tr key={drug.id}>
                  <td className="border px-4 py-2">{drug.drugName}</td>
                  <td className="border px-4 py-2">{drug.batchNumber}</td>
                  <td className="border px-4 py-2">{drug.quantity}</td>
                  <td className="border px-4 py-2">{drug.manufacturer}</td>
                  <td className="border px-4 py-2">{drug.expirationDate}</td>
                  <td className="border px-4 py-2">{drug.price}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => {
                        setEditDrugId(drug.id);
                        setEditDrug({ ...drug });
                      }}
                      className="mr-2 bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteDrug(drug.id)}
                      className="border bg-red-800 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Drug Form */}
      {editDrugId && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Edit Drug</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Drug Name"
              value={editDrug.drugName}
              onChange={(e) =>
                setEditDrug({ ...editDrug, drugName: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Batch Number"
              value={editDrug.batchNumber}
              onChange={(e) =>
                setEditDrug({ ...editDrug, batchNumber: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={editDrug.quantity}
              onChange={(e) =>
                setEditDrug({ ...editDrug, quantity: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Manufacturer"
              value={editDrug.manufacturer}
              onChange={(e) =>
                setEditDrug({ ...editDrug, manufacturer: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="date"
              placeholder="Expiration Date"
              value={editDrug.expirationDate}
              onChange={(e) =>
                setEditDrug({ ...editDrug, expirationDate: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={editDrug.price}
              onChange={(e) =>
                setEditDrug({ ...editDrug, price: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={editDrug.description}
              onChange={(e) =>
                setEditDrug({ ...editDrug, description: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={() => updateDrug(editDrugId)}
            className="mt-4 bg-gray-500 border text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default MakeInventroyPage;
