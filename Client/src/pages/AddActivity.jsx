import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActivity } from "../redux/slices/activitySlice";
import { fetchLeads } from "../redux/slices/leadSlice";
import { useNavigate } from "react-router-dom";

const AddActivity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const [form, setForm] = useState({
    lead_id: "",
    user_id: "", // optional: pre-fill from auth state if you keep user
    type: "Call",
    description: "",
    activity_date: new Date().toISOString().slice(0, 16), // yyyy-mm-ddTHH:MM
  });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // format payload to backend expectation
    const payload = {
      lead_id: Number(form.lead_id),
      user_id: form.user_id ? Number(form.user_id) : undefined,
      type: form.type,
      description: form.description,
      activity_date: new Date(form.activity_date).toISOString(),
    };

    const res = await dispatch(addActivity(payload));
    if (res.meta.requestStatus === "fulfilled") navigate("/activities");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 p-6">
      <div className="w-full max-w-xl bg-gray-800/50 p-8 rounded-3xl shadow-xl">
        <h2 className="text-white text-2xl font-bold mb-4">Add Activity</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300">Lead</label>
            <select name="lead_id" value={form.lead_id} onChange={handleChange} className="w-full p-3 rounded bg-gray-900 text-white">
              <option value="">Select lead</option>
              {leads.map((l) => <option key={l.lead_id} value={l.lead_id}>{l.name} — {l.email}</option>)}
            </select>
          </div>

          <div>
            <label className="text-gray-300">Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full p-3 rounded bg-gray-900 text-white">
              <option>Call</option>
              <option>Email</option>
              <option>Meeting</option>
              <option>Note</option>
              <option>StatusChange</option>
            </select>
          </div>

          <div>
            <label className="text-gray-300">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full p-3 rounded bg-gray-900 text-white" />
          </div>

          <div>
            <label className="text-gray-300">When</label>
            <input name="activity_date" type="datetime-local" value={form.activity_date} onChange={handleChange} className="w-full p-3 rounded bg-gray-900 text-white" />
          </div>

          <button className="w-full bg-blue-600 p-3 rounded text-white">Create Activity</button>
        </form>
      </div>
    </div>
  );
};

export default AddActivity;
