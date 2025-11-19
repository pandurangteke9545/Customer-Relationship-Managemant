import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityById } from "../redux/slices/activitySlice";
import { useParams, Link } from "react-router-dom";

const ViewActivity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { activity, loading } = useSelector((state) => state.activities);

  useEffect(() => {
    if (id) dispatch(fetchActivityById(id));
  }, [id, dispatch]);

  if (loading || !activity) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-3xl mx-auto bg-gray-800/40 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-2">{activity.type}</h2>
        <p className="text-gray-300 mb-4">{activity.description}</p>

        <div className="grid grid-cols-2 gap-3">
          <div><strong>Lead:</strong> {(activity.Lead && activity.Lead.name) || activity.lead_id}</div>
          <div><strong>User:</strong> {(activity.PerformedBy && activity.PerformedBy.username) || activity.user_id}</div>
          <div><strong>Date:</strong> {new Date(activity.activity_date).toLocaleString()}</div>
          <div><strong>Created:</strong> {new Date(activity.created_at).toLocaleString()}</div>
        </div>

        <div className="mt-4 flex gap-3">
          <Link to={`/activities/edit/${activity.activity_id}`} className="px-3 py-1 bg-yellow-500 rounded">Edit</Link>
          <Link to="/activities" className="px-3 py-1 bg-gray-600 rounded">Back</Link>
        </div>
      </div>
    </div>
  );
};

export default ViewActivity;
