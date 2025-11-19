import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities, deleteActivity } from "../redux/slices/activitySlice";
import { fetchLeads } from "../redux/slices/leadSlice";
import { Link, useNavigate } from "react-router-dom";

const Activities = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activities, loading } = useSelector((state) => state.activities);
  const { leads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads()); // to populate lead dropdown in add/edit
    dispatch(fetchActivities());
  }, [dispatch]);

  const onDelete = async (id) => {
    if (!confirm("Delete this activity?")) return;
    await dispatch(deleteActivity(id));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Activities</h1>
          <div className="flex gap-3">
            <Link to="/activities/add" className="bg-blue-600 px-4 py-2 rounded-lg">+ Add</Link>
            <button onClick={() => dispatch(fetchActivities())} className="px-4 py-2 rounded-lg border">Refresh</button>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur rounded-2xl p-4">
          {loading && <div className="p-6 text-center">Loading...</div>}

          {!loading && activities.length === 0 && (
            <div className="p-6 text-center text-gray-400">No activities found.</div>
          )}

          {!loading && activities.length > 0 && (
            <table className="w-full text-white">
              <thead className="text-left border-b border-white/10">
                <tr>
                  <th className="p-3">Activity</th>
                  <th className="p-3">Lead</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((act) => (
                  <tr key={act.activity_id} className="border-b border-white/5 hover:bg-white/2">
                    <td className="p-3">{act.type}: {act.description?.slice(0,60)}</td>
                    <td className="p-3">{(act.Lead && act.Lead.name) || act.lead_id}</td>
                    <td className="p-3">{(act.PerformedBy && act.PerformedBy.username) || act.user_id}</td>
                    <td className="p-3">{new Date(act.activity_date).toLocaleString()}</td>
                    <td className="p-3 flex gap-2">
                      <Link to={`/activities/view/${act.activity_id}`} className="px-2 py-1 bg-green-600 rounded">View</Link>
                      <Link to={`/activities/edit/${act.activity_id}`} className="px-2 py-1 bg-yellow-500 rounded">Edit</Link>
                      <button onClick={() => onDelete(act.activity_id)} className="px-2 py-1 bg-red-600 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;
