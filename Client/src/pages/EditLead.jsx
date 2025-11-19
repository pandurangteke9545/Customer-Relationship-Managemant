import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadById, updateLead } from "../redux/slices/leadSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditLead = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lead, loading } = useSelector((state) => state.leads);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchLeadById(id));
  }, []);

  useEffect(() => {
    if (lead) setFormData(lead);
  }, [lead]);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(updateLead({ leadId: id, updatedData: formData }));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/leads");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black p-6">
      <div className="w-full max-w-lg bg-gray-800/50 p-8 rounded-3xl shadow-xl">
        <h2 className="text-white text-3xl font-bold mb-6">Edit Lead</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {lead &&
    Object.keys(formData).map((field) => (
      <div key={field}>
        <label className="text-gray-300 capitalize">{field}</label>

        {field === "status" ? (
          // ⭐ STATUS DROPDOWN
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full mt-1 bg-gray-900 p-3 text-white rounded-xl border border-gray-700"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
        ) : (
          // ⭐ NORMAL INPUT FOR OTHER FIELDS
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full mt-1 bg-gray-900 p-3 text-white rounded-xl border border-gray-700"
          />
        )}
      </div>
    ))}

          <button className="w-full bg-blue-600 text-white p-3 rounded-xl">
            Update Lead
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLead;
