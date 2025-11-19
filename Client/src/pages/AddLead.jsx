import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLead } from "../redux/slices/leadSlice";
import { useNavigate } from "react-router-dom";

const AddLead = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.leads);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    status: "New",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(addLead(formData));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/leads");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black to-gray-900 p-6">
      <div className="w-full max-w-lg bg-gray-800/50 border border-gray-700 p-8 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transform hover:scale-[1.02] transition-all">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">Add New Lead</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
  {Object.keys(formData).map((field) => (
    <div key={field}>
      <label className="text-gray-300 capitalize">{field}</label>
            {field === "status" ?(
                
            /* ALL OTHER FIELDS KEEP INPUT */
            <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                disabled
                className="w-full mt-1 p-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/40 transition"
            />
            ) :
            field === "source" ? (
            <select
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/40 transition"
            >
                <option value="referral">Referral</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
            </select>
            ) : (
            /* ALL OTHER FIELDS KEEP INPUT */
            <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/40 transition"
            />
            )}
        </div>
        ))}



          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-xl shadow-[0_5px_20px_rgba(0,112,255,0.5)] hover:bg-blue-700 hover:-translate-y-1 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Lead"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLead;
