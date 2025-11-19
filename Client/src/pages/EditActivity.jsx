import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityById, updateActivity } from "../redux/slices/activitySlice";
import { fetchLeads } from "../redux/slices/leadSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditActivity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activity } = useSelector((state) => state.activities);
  const { leads } = useSelector((state) => state.leads);

  const [form, setForm] = useState({
    lead_id: "",
    type: "Call",
    description: "",
    activity_date: "",
  });

  useEffect(() => {
    dispatch(fetchLeads());
    if (id) dispatch(fetchActivityById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (activity) {
      setForm({
        lead_id: activity.lead_id || "",
        type: activity.type || "Call",
        description: activity.description || "",
        activity_date: activity.activity_date ? new Date(activity.activity_date).toISOString().slice(0,16) : "",
      });
    }
  }, [activity]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      lead_id: Number(form.lead_id),
      type: form.type,
      description: form.description,
      activity_date: new Date(form.activity_date).toISOString(),
    };

    const res = await dispatch(updateActivity({ id, data: payload }));
    if (res.meta.requestStatus === "fulfilled") navigate("/activities");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6 text-white">
      <div className="w-full max-w-xl bg-gray-800/50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Edit Activity</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300">Lead</label>
            <select name="lead_id" value={form.lead_id} onChange={handleChange} className="w-full p-3 rounded bg-gray-900 text-white">
              <option value="">Select Lead</option>
              {leads.map((l) => <option key={l.lead_id} value={l.lead_id}>{l.name}</option>)}
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

          <button className="w-full bg-blue-600 p-3 rounded text-white">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditActivity;

