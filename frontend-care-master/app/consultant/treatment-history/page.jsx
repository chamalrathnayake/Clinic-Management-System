"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar";

const TreatmentHistoryPage = () => {
  const [treatmentHistory, setTreatmentHistory] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    prescribe: "",
    medicine_description: "",
    illness_description: "",
    treatment_type_description: "",
  });

  // Fetch treatment history from API
  useEffect(() => {
    const fetchTreatmentHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5001/treatment");
        setTreatmentHistory(response.data); // Set fetched data
      } catch (error) {
        alert(`Error fetching treatment history: ${error.message}`);
      }
    };

    fetchTreatmentHistory();
  }, []);

  // Function to handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this treatment?")) {
      try {
        await axios.delete(`http://localhost:5001/treatment/${id}`);
        // Remove deleted treatment from the state
        setTreatmentHistory(
          treatmentHistory.filter((treatment) => treatment.id !== id)
        );
        alert("Treatment deleted successfully!");
      } catch (error) {
        alert(`Error deleting treatment: ${error.message}`);
      }
    }
  };

  // Function to handle update
  const handleUpdate = (treatment) => {
    setUpdateData({
      prescribe: treatment.prescribe,
      medicine_description: treatment.medicine_discription,
      illness_description: treatment.Illness_description,
      treatment_type_description: treatment.treatment_type_discription,
    });
    setSelectedTreatment(treatment.id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTreatment(null);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/treatment/${selectedTreatment}`, {
        ...updateData,
      });
      // Update the treatment history in state
      setTreatmentHistory((prev) =>
        prev.map((treatment) =>
          treatment.id === selectedTreatment
            ? { ...treatment, ...updateData }
            : treatment
        )
      );
      alert("Treatment updated successfully!");
      handleModalClose();
    } catch (error) {
      alert(`Error updating treatment: ${error.message}`);
    }
  };

  return (
    <div>
      <NavBar hideTitle={true} title="Treatment History" />

      <div className="min-h-screen bg-white text-black p-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black p-2">ID</th>
                <th className="border border-black p-2">Patient Name</th>
                <th className="border border-black p-2">Prescribe</th>
                <th className="border border-black p-2">
                  Medicine Description
                </th>
                <th className="border border-black p-2">Illness Description</th>
                <th className="border border-black p-2">Treatment Type</th>
                <th className="border border-black p-2">Date</th>
                <th className="border border-black p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {treatmentHistory.map((treatment) => (
                <tr key={treatment.id} className="hover:bg-gray-100">
                  <td className="border border-black p-2">{treatment.id}</td>
                  <td className="border border-black p-2">
                    {treatment.patient_name}
                  </td>
                  <td className="border border-black p-2">
                    {treatment.prescribe}
                  </td>
                  <td className="border border-black p-2">
                    {treatment.medicine_discription}
                  </td>
                  <td className="border border-black p-2">
                    {treatment.Illness_description}
                  </td>
                  <td className="border border-black p-2">
                    {treatment.treatment_type_discription}
                  </td>
                  <td className="border border-black p-2">
                    {new Date(treatment.date_time).toLocaleString()}
                  </td>
                  <td className="border border-black p-2">
                    <button
                      onClick={() => handleUpdate(treatment)}
                      className="text-gray-500 hover:underline mr-2 p-2 border border-gray-500 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(treatment.id)}
                      className="text-gray-500 hover:underline p-2 border border-gray-500 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Updating Treatment */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-xl font-bold mb-4">Update Treatment</h3>
              <form onSubmit={handleSubmitUpdate}>
                <div className="mb-4">
                  <label className="block mb-2">Prescribe:</label>
                  <input
                    type="text"
                    value={updateData.prescribe}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        prescribe: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Medicine Description:</label>
                  <input
                    type="text"
                    value={updateData.medicine_description}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        medicine_description: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Illness Description:</label>
                  <input
                    type="text"
                    value={updateData.illness_description}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        illness_description: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Treatment Type:</label>
                  <input
                    type="text"
                    value={updateData.treatment_type_description}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        treatment_type_description: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gray-500 text-white hover:bg-gray-600 p-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentHistoryPage;
